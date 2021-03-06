import _ from "lodash";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import { string, mixed, number, object } from "yup";
import {
  validateEmail,
  validateUsername,
} from "../utils/validate";
import { useRouter } from "next/router";
import { showPopup } from "./Notification";

const Registration = () => {
  const router = useRouter();

  return (
    <div className="relative top-48">
      <div className="container mx-auto px-4">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full md:w-2/3 xl:w-1/3 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-2xl border-0 rounded-lg bg-gray-600">
              <div className="text-gray-100 flex-auto px-4 lg:px-10 py-10 pt-8">
                <div className="text-center mb-3 font-bold text-xl">
                  <h3>Register</h3>
                </div>
                <FormikStepper
                  className="mt-8"
                  initialValues={{
                    username: "",
                    email: "",
                    password: "",
                    firstName: "",
                    middleName: "",
                    lastName: "",
                    batch: "2023",
                    degree: "B. Tech.",
                    field: "Computer Science Engineering",
                    rollNo: "",
                  }}
                  onSubmit={async (values) => {
                    showPopup(
                      `Please verify your account from the link sent to email `,
                      "green"
                    );
                    await axios
                      .post(
                        process.env.serverUrl + "users",
                        {
                          username: values.username,
                          email:
                            values.email + "@jklu.edu.in",
                          password: values.password,
                          firstName: values.firstName,
                          middleName: values.middleName,
                          lastName: values.lastName,
                          batch: values.batch,
                          degree: values.degree,
                          field: values.field,
                          rollNo: values.rollNo,
                        }
                      )
                      .then((res) => {
                        router.push("/login");
                        console.log("User Created");
                      })
                      .catch((err) => {
                        router.reload();
                        console.log(err);
                      });
                  }}
                >
                  <FormikStep
                    label="Login Information"
                    validationSchema={object({
                      username: string()
                        .required("Username is required!")
                        .matches(
                          /^[aA-zZ0-9.]+$/,
                          "Username cannot contains spaces or any symbols"
                        )
                        .test(
                          "isAlreadyExists",
                          "Username already exists",
                          (value, context) =>
                            validateUsername(value)
                        ),
                      email: string()
                        .required("Email is required")
                        .matches(
                          /^[aA-zZ0-9.]+$/,
                          "Email cannot contains spaces or any symbols except a period"
                        )
                        .test(
                          "isEmailValid",
                          "Email Address already exists",
                          (value, context) =>
                            validateEmail(
                              value + "@jklu.edu.in"
                            )
                        ),
                      password: string()
                        .required("Password is required")
                        .min(
                          8,
                          "Password must be at-least 8 characters long"
                        )
                        .matches(
                          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
                          "Password must contain at-least one uppercase, lowercase, number and symbol"
                        ),
                    })}
                  >
                    <InputField
                      label="Username"
                      name="username"
                      type="text"
                      placeholder="Enter your username"
                    />
                    <InputField
                      label="Email"
                      name="email"
                      type="text"
                      placeholder="Enter your email"
                      isEmail="true"
                    />
                    <InputField
                      label="Password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                    />
                  </FormikStep>

                  <FormikStep
                    label="Personal Information"
                    validationSchema={object({
                      firstName: string()
                        .required("First Name is Required")
                        .matches(
                          /^[aA-zZ]+$/,
                          "First Name Cannot contain numeric, symbols, spaces"
                        ),
                      middleName: string().matches(
                        /^[aA-zZ]+$/,
                        "Middle Name Cannot contain numeric, symbols, spaces"
                      ),
                      lastName: string(
                        "Last Name is Required"
                      )
                        .required()
                        .matches(
                          /^[aA-zZ]+$/,
                          "Last Name Cannot contain numeric, symbols, spaces"
                        ),
                    })}
                  >
                    <InputField
                      label="First Name"
                      name="firstName"
                      type="text"
                      placeholder="Enter your First name"
                    />
                    <InputField
                      label="Middle Name"
                      name="middleName"
                      type="text"
                      placeholder="Enter your Middle name"
                    />
                    <InputField
                      label="Last Name"
                      name="lastName"
                      type="text"
                      placeholder="Enter your Last name"
                    />
                  </FormikStep>

                  <FormikStep
                    label="Student Information"
                    validationSchema={object({
                      rollNo: number()
                        .required("Roll No. is required")
                        .positive(
                          "Roll no. must be a positive number"
                        ),
                    })}
                  >
                    <InputField
                      as="select"
                      label="Batch"
                      name="batch"
                      placeholder="Year of Graduation"
                    >
                      <option value="*" disabled>
                        Year of Graduation
                      </option>
                      {_.range(
                        2017,
                        new Date().getFullYear() + 3,
                        1
                      ).map((option, index) => {
                        return (
                          <option
                            value={option}
                            key={index}
                          >
                            {option}
                          </option>
                        );
                      })}
                    </InputField>

                    <InputField
                      as="select"
                      label="Degree"
                      name="degree"
                      placeholder="Select your Degree"
                    >
                      <option value="*" disabled>
                        Select Degree
                      </option>
                      <optgroup label="Institute of Engineernig and Technology">
                        <option value="B. Tech.">
                          B. Tech.
                        </option>
                        <option value="BCA">BCA</option>
                        <option value="M. Tech.">
                          M. Tech.
                        </option>
                        <option value="MCA">MCA</option>
                        <option value="PhD">PhD</option>
                      </optgroup>
                      <optgroup label="Institute of Management">
                        <option value="BBA">BBA</option>
                        <option value="MBA">MBA</option>
                        <option value="PhD">PhD</option>
                      </optgroup>
                      <optgroup label="Institute of Design">
                        <option value="B. Des.">
                          B. Des.
                        </option>
                        <option value="M. Des.">
                          M. Des.
                        </option>
                      </optgroup>
                    </InputField>

                    <InputField
                      as="select"
                      label="Field"
                      name="field"
                      placeholder="Enter your Major"
                    >
                      <optgroup label="B. Tech.">
                        <option value="Computer Science Engineering">
                          Computer Science Engineering
                        </option>
                        <option value="Mechanical Engineering">
                          Mechanical Engineering
                        </option>
                        <option value="Civil Engineering">
                          Civil Engineering
                        </option>
                        <option value="Electrical Engineering">
                          Electrical Engineering
                        </option>
                        <option value="Electronics and Communication Engineeringe">
                          Electronics and Communication
                          Engineering
                        </option>
                        <option value="Electrical and Electronics Engineering">
                          Electrical and Electronics
                          Engineering
                        </option>
                      </optgroup>
                      <optgroup label="B. Des.">
                        <option value="Product Design">
                          Product Design
                        </option>
                        <option value="Interaction Design">
                          Interaction Design
                        </option>
                        <option value="Interdisciplinary Design">
                          Interdisciplinary Design
                        </option>
                        <option value="Integrated and Communication Design">
                          Integrated and Communication
                          Design
                        </option>
                      </optgroup>
                      <optgroup label="M. Tech.">
                        <option value="Data Science">
                          Data Science
                        </option>
                        <option value="Embedded Systems and IoT">
                          Embedded Systems and IoT
                        </option>
                        <option value="Automation and Robotics">
                          Automation and Robotics
                        </option>
                        <option value="Health, Safety and Environment">
                          Health, Safety and Environment
                        </option>
                      </optgroup>
                    </InputField>

                    <InputField
                      label="Roll No."
                      name="rollNo"
                      type="number"
                      placeholder="Enter your Roll No."
                      min="1"
                    />
                  </FormikStep>
                </FormikStepper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;

function FormikStep({ children }) {
  return <>{children}</>;
}

function FormikStepper({ children, ...props }) {
  const childrenArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else {
          setStep((s) => s + 1);
          helpers.setTouched({});
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off" target="/login">
          {currentChild}

          <div className="grid grid-cols-2 gap-4">
            {step > 0 ? (
              <Button
                type="button"
                disabled={isSubmitting}
                onClick={() => setStep((s) => s - 1)}
              >
                Back
              </Button>
            ) : null}

            <div className={step > 0 ? null : `col-span-2`}>
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting
                  ? "Submitting"
                  : isLastStep()
                  ? "Submit"
                  : "Next"}
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

function InputField({
  label,
  type,
  placeholder,
  name,
  isEmail,
  children,
  as,
  ...props
}) {
  return (
    <div className="relative w-full mb-5">
      <label
        className="block text-xs font-bold mb-2"
        htmlFor="grid-password"
      >
        {label}
      </label>
      <div className="flex rounded overflow-hidden text-sm shadow bg-white">
        <Field
          as={as}
          type={type}
          name={name}
          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring-0 w-full"
          placeholder={placeholder}
          style={{
            transition: "all .15s ease",
          }}
          {...props}
        >
          {children}
        </Field>
        {isEmail ? (
          <div className="text-center bg-gray-100 px-5 py-3 font-semibold border-l-2 border-gray-300 text-gray-600">
            @jklu.edu.in
          </div>
        ) : (
          ""
        )}
      </div>
      <ErrorMessage
        name={name}
        component={CustomErrorMessage}
      />
    </div>
  );
}

function Button({ children, type, disabled, onClick }) {
  return (
    <div className="text-center mt-8">
      <button
        className={`${
          type == "submit" && children == "Submit"
            ? "bg-green-500"
            : "bg-gray-900"
        } active:bg-gray-700 text-sm font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mx-1 mb-1 w-full`}
        type={type}
        disabled={disabled}
        onClick={onClick}
        style={{
          transition: "all .15s ease",
        }}
      >
        {children}
      </button>
    </div>
  );
}

function TextLink({ children, href }) {
  return (
    <div className="flex justify-center mt-2">
      <a
        href={href}
        onClick={(e) => e.preventDefault()}
        className="text-gray-100"
      >
        <small>{children}</small>
      </a>
    </div>
  );
}

function CustomErrorMessage({ children }) {
  return (
    <span className="text-sm text-red-500">{children}</span>
  );
}
