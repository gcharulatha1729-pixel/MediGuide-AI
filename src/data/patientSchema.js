const emptyPatientData = {
  status: "empty",

  patient_name: "",

  medicines: [],

  diet: [],

  warnings: [],

  follow_up: {
    timing: "",
    instructions: "",
  },

  verification: {
    status: "CLEAR",
    refusal: false,
    refusal_message: "",
  },
};

export default emptyPatientData;