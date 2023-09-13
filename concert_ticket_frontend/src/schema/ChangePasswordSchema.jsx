import * as yup from 'yup'

export const ChangePasswordSchema = yup.object().shape({
    currentPassword: yup
    .string()
    .min(8, "Weak password"),
    newPassword1: yup
    .string()
    .min(8, "Weak password")
    .required("Password is required")
    .test(
        'password-match',
        'Do not assign a previous password',
        function(value) {
            return value !== this.parent.currentPassword
        }
    ),
    newPassword2: yup
    .string()
    .min(8, "Weak password")
    .required("Password is required")
    .oneOf([yup.ref('newPassword1')], "Password must match"),
})