const validation = (values, allRecipes) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Se requiere nombre";
  }

  if (!values.summary) {
    errors.summary = "Se requiere resumen";
  } else if (values.summary.length < 10) {
    errors.summary = "El resumen debe tener al menos 10 caracteres";
  }

  if (!values.image) {
    errors.image = "Se requiere URL de la imagen";
  }

  return errors;
};

export default validation;
