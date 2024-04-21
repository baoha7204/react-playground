import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import { FieldErrors, useForm, useFieldArray } from "react-hook-form";

// validation rule
// 1. required
// 2. regExp
// 3. min, max

let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    facebook: string;
    instagram: string;
  };
  phoneNumbers: {
    number: string;
  }[];
};

const YoutubeFormDemo = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      username: "F-code",
      email: "",
      channel: "",
      social: {
        facebook: "F-code",
        instagram: "",
      },
      phoneNumbers: [{ number: "" }],
    },
  });

  //   useEffect(() => {
  //     const subscription = watch((value) => {
  //       console.log(value);
  //     });
  //     return () => subscription.unsubscribe();
  //   }, [watch]);

  const { fields, remove, append } = useFieldArray({
    control,
    name: "phoneNumbers",
  });
  renderCount++;
  const onSubmit = (data: FormValues) => {
    console.log("Submit", data);
  };
  const onError = (error: FieldErrors) => {
    console.log("Error", error);
  };
  return (
    <div>
      <h1>Youtube Form ({renderCount / 2})</h1>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: {
                value: true,
                message: "This field is required",
              },
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              validate: {
                noFPT: (value) =>
                  !value.endsWith("fpt.edu.vn") || "Email can not from FPT",
                noExistedEmail: async (value) => {
                  const response = await fetch(
                    `https://jsonplaceholder.typicode.com/users?email=${value}`
                  );
                  const data = await response.json();
                  return data.length === 0 || "Email already exists";
                },
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input type="text" id="channel" {...register("channel")} />
        </div>

        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <input type="text" id="facebook" {...register("social.facebook")} />
        </div>

        <div className="form-control">
          <label htmlFor="instagram">Instagram</label>
          <input type="text" id="instagram" {...register("social.instagram")} />
        </div>
        <div>
          <div>Phone numbers</div>
          {fields.map((field, index) => {
            return (
              <div className="form-control">
                <input
                  type="text"
                  id="instagram"
                  key={field.id}
                  {...register(`phoneNumbers.${index}.number`)}
                />
                <button type="button" onClick={() => remove(index)}>
                  Remove
                </button>
              </div>
            );
          })}
          <button type="button" onClick={() => append({ number: "" })}>
            Add
          </button>
        </div>
        <div className="form-control">
          <label htmlFor="instagram">Instagram</label>
          <input type="text" id="instagram" {...register("social.instagram")} />
        </div>

        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
        <button type="button" onClick={() => console.log(getValues())}>
          Get values
        </button>
        <button type="button" onClick={() => setValue("channel", "BH Gaming")}>
          Set channel
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YoutubeFormDemo;
