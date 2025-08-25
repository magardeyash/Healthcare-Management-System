// Utility functions for calculating health metrics and scores

export const calculateHealthScore = (records) => {
  if (!records || records.length === 0) return 0;
  
  let totalScore = 0;
  let metricCount = 0;
  
  records.forEach(record => {
    if (record.healthMetrics) {
      // Blood Pressure Score
      if (record.healthMetrics.systolic && record.healthMetrics.diastolic) {
        const bpScore = calculateBloodPressureScore(
          record.healthMetrics.systolic, 
          record.healthMetrics.diastolic
        );
        totalScore += bpScore;
        metricCount++;
      }
      
      // Heart Rate Score
      if (record.healthMetrics.heartRate) {
        const hrScore = calculateHeartRateScore(record.healthMetrics.heartRate);
        totalScore += hrScore;
        metricCount++;
      }
      
      // Temperature Score
      if (record.healthMetrics.temperature) {
        const tempScore = calculateTemperatureScore(record.healthMetrics.temperature);
        totalScore += tempScore;
        metricCount++;
      }
      
      // Weight Score (BMI calculation would be better, but using weight for demo)
      if (record.healthMetrics.weight) {
        const weightScore = calculateWeightScore(record.healthMetrics.weight);
        totalScore += weightScore;
        metricCount++;
      }
      
      // Cholesterol Score
      if (record.healthMetrics.cholesterol) {
        const cholScore = calculateCholesterolScore(record.healthMetrics.cholesterol);
        totalScore += cholScore;
        metricCount++;
      }
      
      // Blood Sugar Score
      if (record.healthMetrics.bloodSugar) {
        const bsScore = calculateBloodSugarScore(record.healthMetrics.bloodSugar);
        totalScore += bsScore;
        metricCount++;
      }
    }
  });
  
  return metricCount > 0 ? Math.round(totalScore / metricCount) : 0;
};

export const calculateBloodPressureScore = (systolic, diastolic) => {
  // Normal: <120/<80, Elevated: 120-129/<80, High: ≥130/≥80
  if (systolic < 120 && diastolic < 80) return 100; // Excellent
  if (systolic < 130 && diastolic < 80) return 85;  // Good
  if (systolic < 140 && diastolic < 90) return 70;  // Fair
  if (systolic < 160 && diastolic < 100) return 50; // Poor
  return 30; // Very poor
};

export const calculateHeartRateScore = (heartRate) => {
  // Normal resting heart rate: 60-100 bpm
  if (heartRate >= 60 && heartRate <= 100) return 100; // Excellent
  if (heartRate >= 50 && heartRate <= 110) return 85;  // Good
  if (heartRate >= 40 && heartRate <= 120) return 70;  // Fair
  return 50; // Poor
};

export const calculateTemperatureScore = (temperature) => {
  // Normal body temperature: 97-99°F
  if (temperature >= 97 && temperature <= 99) return 100; // Excellent
  if (temperature >= 96.5 && temperature <= 99.5) return 85; // Good
  if (temperature >= 96 && temperature <= 100) return 70; // Fair
  return 50; // Poor
};

export const calculateWeightScore = (weight) => {
  // Assuming average healthy weight range (simplified)
  if (weight >= 50 && weight <= 100) return 100; // Excellent
  if (weight >= 45 && weight <= 110) return 85;  // Good
  if (weight >= 40 && weight <= 120) return 70;  // Fair
  return 50; // Poor
};

export const calculateCholesterolScore = (cholesterol) => {
  // Total cholesterol: <200 mg/dL (desirable), 200-239 (borderline), ≥240 (high)
  if (cholesterol < 200) return 100; // Excellent
  if (cholesterol < 240) return 75;  // Good
  if (cholesterol < 300) return 50;  // Fair
  return 25; // Poor
};

export const calculateBloodSugarScore = (bloodSugar) => {
  // Fasting blood sugar: <100 mg/dL (normal), 100-125 (prediabetes), ≥126 (diabetes)
  if (bloodSugar < 100) return 100; // Excellent
  if (bloodSugar < 126) return 75;  // Good
  if (bloodSugar < 200) return 50;  // Fair
  return 25; // Poor
};

export const getLatestHealthMetrics = (records) => {
  const healthRecords = records.filter(record => record.healthMetrics);
  
  if (healthRecords.length === 0) return null;
  
  // Sort by date and get the latest record
  const sortedRecords = healthRecords.sort((a, b) => new Date(b.date) - new Date(a.date));
  const latestRecord = sortedRecords[0];
  
  return latestRecord.healthMetrics;
};

export const getHealthMetricsHistory = (records) => {
  const healthRecords = records.filter(record => record.healthMetrics);
  
  return healthRecords.map(record => ({
    date: record.date,
    type: record.type,
    metrics: record.healthMetrics
  })).sort((a, b) => new Date(a.date) - new Date(b.date));
};

