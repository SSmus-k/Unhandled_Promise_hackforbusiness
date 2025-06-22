import os
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.metrics import classification_report, mean_squared_error
import joblib
import subprocess
import sys
import os

def load_data(filepath):
    df = pd.read_csv(filepath)
    # Drop rows missing crucial columns
    df = df.dropna(subset=['sector', 'waste_amount', 'has_problem'])
    return df

def preprocess(df):
    le_sector = LabelEncoder()
    df['sector_encoded'] = le_sector.fit_transform(df['sector'])
    
    # Ensure is_sustainable is int type (0/1)
    if 'is_sustainable' in df.columns:
        df['is_sustainable'] = df['is_sustainable'].astype(int)
    else:
        df['is_sustainable'] = 0
    
    return df, le_sector

def train_problem_classifier(df):
    features = ['sector_encoded', 'is_sustainable', 'waste_amount']
    X = df[features]
    y = df['has_problem']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    clf = RandomForestClassifier(n_estimators=100, random_state=42)
    clf.fit(X_train, y_train)
    
    preds = clf.predict(X_test)
    print("Classification Report:\n", classification_report(y_test, preds))
    return clf

def train_waste_regressor(df):
    if 'predicted_waste_next_year' not in df.columns:
        print("No target column 'predicted_waste_next_year' found. Skipping regression training.")
        return None
    
    features = ['sector_encoded', 'is_sustainable', 'waste_amount']
    X = df[features]
    y = df['predicted_waste_next_year']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    reg = RandomForestRegressor(n_estimators=100, random_state=42)
    reg.fit(X_train, y_train)
    
    preds = reg.predict(X_test)
    mse = mean_squared_error(y_test, preds)
    print(f"Regression Mean Squared Error: {mse:.2f}")
    return reg

def save_models(classifier, regressor, sector_encoder):
    joblib.dump(sector_encoder, 'sector_encoder.pkl')
    joblib.dump(classifier, 'problem_classifier.pkl')
    if regressor:
        joblib.dump(regressor, 'waste_regressor.pkl')
    print("Models saved successfully.")

def main():
    # Dynamically get project root relative to this file
    current_dir = os.path.dirname(os.path.abspath(__file__))  # backend/api4
    project_root = os.path.abspath(os.path.join(current_dir, '..'))  # backend/
    filepath = os.path.join(project_root, 'api', 'ml', 'training_data.csv')
    
    print(f"Loading data from: {filepath}")
    df = load_data(filepath)
    df, le_sector = preprocess(df)
    
    clf = train_problem_classifier(df)
    reg = train_waste_regressor(df)
    
    save_models(clf, reg, le_sector)

if __name__ == "__main__":
    main()
def main():
    current_dir = os.path.dirname(os.path.abspath(__file__))  # backend/api4
    project_root = os.path.abspath(os.path.join(current_dir, '..'))  # backend/
    csv_path = os.path.join(project_root, 'api', 'ml', 'training_data.csv')
    
    print(f"Loading data from: {csv_path}")
    df = load_data(csv_path)
    df, le_sector = preprocess(df)
    
    clf = train_problem_classifier(df)
    reg = train_waste_regressor(df)
    
    save_models(clf, reg, le_sector)
    
    # Now run load_csv.py script
    load_csv_path = os.path.join(project_root, 'api', 'ml', 'load_csv.py')
    print(f"Running load_csv.py to update database from CSV at: {load_csv_path}")
    
    # Use the same Python interpreter
    result = subprocess.run([sys.executable, load_csv_path], capture_output=True, text=True)
    
    print("load_csv.py output:")
    print(result.stdout)
    if result.returncode != 0:
        print("Error running load_csv.py:", result.stderr)

if __name__ == "__main__":
    main()