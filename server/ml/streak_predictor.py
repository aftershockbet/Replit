import json
import sys
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
import numpy as np
import joblib
import os

class StreakPredictor:
    def __init__(self):
        self.model = LogisticRegression(random_state=42, max_iter=1000)
        self.is_trained = False
        self.model_path = os.path.join(os.getcwd(), 'server', 'ml', 'streak_model.pkl')
        
        if os.path.exists(self.model_path):
            try:
                self.model = joblib.load(self.model_path)
                self.is_trained = True
            except:
                pass
    
    def extract_features(self, data):
        """
        Extract features for prediction.
        Expected data structure:
        {
            'streakLength': int,
            'avgMargin': float (optional),
            'daysSinceLastEvent': int,
            'historicalLongestStreak': int,
            'isHome': bool,
            'leaguePosition': int (optional)
        }
        """
        features = []
        
        features.append(data['streakLength'])
        features.append(data.get('avgMargin', 0))
        features.append(data['daysSinceLastEvent'])
        features.append(data['historicalLongestStreak'])
        features.append(1 if data['isHome'] else 0)
        
        position = data.get('leaguePosition', 10)
        features.append(1 if position <= 5 else 0)
        features.append(1 if position >= 18 else 0)
        
        return np.array(features).reshape(1, -1)
    
    def train(self, training_data):
        """
        Train the model with synthetic data.
        training_data: list of {features: dict, outcome: 'continue'|'break'}
        """
        X = []
        y = []
        
        for sample in training_data:
            features = self.extract_features(sample['features'])
            X.append(features[0])
            y.append(1 if sample['outcome'] == 'continue' else 0)
        
        X = np.array(X)
        y = np.array(y)
        
        self.model.fit(X, y)
        self.is_trained = True
        
        joblib.dump(self.model, self.model_path)
        
        return {'success': True, 'samples': len(X)}
    
    def predict(self, features_data):
        """
        Predict streak continuation probability.
        Returns: {
            'confidenceScore': float (0-100),
            'prediction': 'continue'|'break',
            'features': dict
        }
        """
        if not self.is_trained:
            training_data = self._generate_synthetic_data()
            self.train(training_data)
        
        features = self.extract_features(features_data)
        
        prob_continue = self.model.predict_proba(features)[0][1]
        
        confidence = round(prob_continue * 100, 1)
        prediction = 'continue' if prob_continue >= 0.5 else 'break'
        
        return {
            'confidenceScore': confidence,
            'prediction': prediction,
            'features': features_data
        }
    
    def _generate_synthetic_data(self):
        """
        Generate synthetic training data based on football streak patterns.
        """
        data = []
        
        for _ in range(100):
            streak_length = np.random.randint(3, 10)
            
            prob_continue = 0.5
            
            if streak_length >= 7:
                prob_continue -= 0.2
            elif streak_length >= 5:
                prob_continue -= 0.1
            
            days_since = np.random.randint(1, 30)
            if days_since > 14:
                prob_continue -= 0.15
            
            is_home = np.random.choice([True, False])
            if is_home:
                prob_continue += 0.1
            
            position = np.random.randint(1, 20)
            if position <= 5:
                prob_continue += 0.15
            elif position >= 18:
                prob_continue -= 0.15
            
            historical_longest = max(streak_length + np.random.randint(-2, 5), streak_length)
            if streak_length >= historical_longest - 1:
                prob_continue -= 0.1
            
            avg_margin = np.random.uniform(0.5, 3.0)
            if avg_margin > 2.0:
                prob_continue += 0.1
            
            prob_continue = max(0.1, min(0.9, prob_continue))
            
            outcome = 'continue' if np.random.random() < prob_continue else 'break'
            
            data.append({
                'features': {
                    'streakLength': int(streak_length),
                    'avgMargin': round(float(avg_margin), 2),
                    'daysSinceLastEvent': int(days_since),
                    'historicalLongestStreak': int(historical_longest),
                    'isHome': bool(is_home),
                    'leaguePosition': int(position)
                },
                'outcome': outcome
            })
        
        return data

if __name__ == '__main__':
    predictor = StreakPredictor()
    
    if len(sys.argv) > 1:
        input_data = json.loads(sys.argv[1])
        result = predictor.predict(input_data)
        print(json.dumps(result))
    else:
        print(json.dumps({'error': 'No input data provided'}))
