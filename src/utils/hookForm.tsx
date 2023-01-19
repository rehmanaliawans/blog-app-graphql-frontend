import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Email must be a valid email address").required("Email is required"),
  password: Yup.string().required("Password is required")
});

export const updateSPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()"'.,<>;:`~|?-_]))(?=.{8,})/,
      "Must contain 8 characters, one small letter,one capital letter, one number and one special case Character"
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Password does not match")
});

export const ForgotSchema = Yup.object().shape({
  email: Yup.string().email("Email must be a valid email address").required("Email is required")
});

export const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().required("First name required").min(3, "Minimum 3 characters"),
  lastName: Yup.string().required("Last name required").min(3, "Minimum 3 characters"),
  email: Yup.string().email("Email must be a valid email address").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()"'.,<>;:`~|?-_]))(?=.{8,})/,
      "Must contain 8 characters, one small letter,one capital letter, one number and one special case Character"
    )
});



export const ProfileSchema = Yup.object().shape({
  firstName: Yup.string().required('First name required').min(3, 'Minimum 3 characters'),
  lastName: Yup.string().required('Last name required').min(3, 'Minimum 3 characters'),
  email: Yup.string().email('Email must be a valid email address').required('Email is required')
});
