const patientData = {
  status: "success",

  patient: {
    name: "Patient"
  },

  medicines: [
    {
      name: "Metformin",
      dosage: "500 mg",
      frequency: "Twice Daily",
      foodTiming: "After Food",
      duration: "3 Months",

      schedule: [
        {
          time: "Morning",
          instruction: "After Breakfast"
        },
        {
          time: "Evening",
          instruction: "After Dinner"
        }
      ]
    }
  ],

  warnings: [
    "Chest pain",
    "Breathing difficulty",
    "Severe weakness"
  ],

  diet: [
    "Drink enough water",
    "Avoid oily foods",
    "Take healthy meals"
  ],

  followUp: {
    date: "20 October 2026",
    instructions:
      "Bring reports and discharge summary."
  }
};

export default patientData;