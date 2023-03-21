import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";

function App() {
  const methods = useForm({
    reValidateMode: "onBlur",
  });

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm({ mode: "onSubmit" });
  const radioGroups = 50;
  const genders = ["Male", "Female", "Non-binary", "Other"];

  const handleErrors = () => {
    scrollToFirstMissedField();
  };

  const scrollToFirstMissedField = () => {
    const firstMissedRequiredField = Object.keys(formErrors)[0];
    console.log(firstMissedRequiredField);
    if (firstMissedRequiredField) {
      const missedFieldRef = register(firstMissedRequiredField);
      const missedFieldOffsetTop = missedFieldRef;

      if (missedFieldOffsetTop) {
        console.log(missedFieldOffsetTop);
        window.scrollTo({
          top: missedFieldOffsetTop,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div style={{ width: 400, margin: "30px auto" }}>
      <form onSubmit={handleSubmit(handleErrors)}>
        {[...new Array(radioGroups)].map((_, index) => (
          <div key={index} style={{ margin: 30 }}>
            <div>Select Your Gender</div>
            <div key={index} style={{ background: "#eee", padding: 10 }}>
              {genders.map((gender) => (
                <Form.Group key={gender}>
                  <Form.Check
                    name={`group${index}`}
                    type="radio"
                    label={gender}
                    {...register(`gender${index}`, {
                      required: "Gender is required",
                    })}
                    isInvalid={!!formErrors.gender}
                  />
                </Form.Group>
              ))}
              {formErrors[`gender${index}`] && (
                <div style={{ display: "block" }}>
                  {formErrors[`gender${index}`].message}!!
                </div>
              )}
            </div>
          </div>
        ))}
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default App;
