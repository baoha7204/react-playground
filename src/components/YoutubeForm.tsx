import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    facebook: string;
    twitter: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
  age: number;
  dob: Date;
};

let renderCount = 0;

const YoutubeForm = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: {
      errors,
      touchedFields,
      dirtyFields,
      isDirty,
      isValid,
      isSubmitting,
      isSubmitted,
      isSubmitSuccessful,
      submitCount,
    },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      username: "Bao Ha",
      email: "",
      channel: "",
      social: {
        facebook: "",
        twitter: "",
      },
      phoneNumbers: ["", ""],
      phNumbers: [{ number: "" }],
      age: 0,
      dob: new Date(),
    },
    // defaultValues: async () => {
    //   const response = await fetch(
    //     "https://jsonplaceholder.typicode.com/users/2"
    //   );
    //   const data = await response.json();
    //   return {
    //     username: data.name,
    //     email: data.email,
    //     channel: "",
    //   };
    // },
  });

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  // const watchUsername = watch("username");

  // console.log("Touched fields", touchedFields);
  // console.log("Dirty fields", dirtyFields);
  // console.log({ isSubmitting, isSubmitted, isSubmitSuccessful, submitCount });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("Form errors", errors);
  };

  const handleGetValues = () => {
    console.log(getValues(["username", "social.facebook", "phNumbers"]));
  };

  const handleSetValue = () => {
    setValue("username", "", {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  // useEffect(() => {
  //   const subscription = watch((value) => {
  //     console.log(value);
  //   });
  //   return () => subscription.unsubscribe();
  // }, [watch]);
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);
  renderCount++;

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
          {errors?.username && (
            <p className="error">{errors.username.message}</p>
          )}
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: {
                value: true,
                message: "This field is required",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
              validate: {
                noAdmin: (value) =>
                  value !== "admin@gmail.com" ||
                  "Enter a different email address",
                noBlacklisted: (value) =>
                  !value.endsWith("fpt.edu.vn") ||
                  "Emails ending with fpt.edu.vn are not allowed",
                noEmailExists: async (value) => {
                  const response = await fetch(
                    `https://jsonplaceholder.typicode.com/users?email=${value}`
                  );
                  const data = await response.json();
                  return data.length === 0 || "Email already exists";
                },
              },
            })}
          />
          {errors?.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: {
                value: true,
                message: "This field is required",
              },
            })}
          />
          {errors?.channel && <p className="error">{errors.channel.message}</p>}
        </div>

        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="twitter"
            {...register("social.twitter", {
              disabled: watch("channel") === "",
              required: {
                value: true,
                message: "This field is required",
              },
            })}
          />
          {errors?.social?.twitter && (
            <p className="error">{errors.social.twitter.message}</p>
          )}
        </div>

        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <input type="text" id="facebook" {...register("social.facebook")} />
        </div>

        <div className="form-control">
          <label htmlFor="primary-phone">Primary phone number</label>
          <input
            type="text"
            id="primary-phone"
            {...register("phoneNumbers.0")}
          />
        </div>

        <div className="form-control">
          <label htmlFor="secondary-phone">Secondary phone number</label>
          <input
            type="text"
            id="secondary-phone"
            {...register("phoneNumbers.1")}
          />
        </div>

        <div>
          <label>List of phone numbers</label>
          {fields.map((field, index) => (
            <div className="form-control" key={field.id}>
              <input
                type="text"
                {...register(`phNumbers.${index}.number` as const)}
                defaultValue={field.number}
              />
              <button type="button" onClick={() => remove(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={() => append({ number: "" })}>
            Add
          </button>
        </div>

        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", {
              valueAsNumber: true,
              required: {
                value: true,
                message: "This field is required",
              },
            })}
          />
          {errors?.age && <p className="error">{errors.age.message}</p>}
        </div>

        <div className="form-control">
          <label htmlFor="dob">Date of birth</label>
          <input
            type="date"
            id="dob"
            {...register("dob", {
              valueAsDate: true,
              required: {
                value: true,
                message: "This field is required",
              },
            })}
          />
          {errors?.dob && <p className="error">{errors.dob.message}</p>}
        </div>

        <button disabled={!isDirty || isSubmitting}>Submit</button>
        <button type="button" onClick={() => reset()}>
          Reset
        </button>
        <button type="button" onClick={handleGetValues}>
          Get current values
        </button>
        <button type="button" onClick={handleSetValue}>
          Set value
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YoutubeForm;
