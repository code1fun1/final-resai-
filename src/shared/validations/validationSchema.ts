import { TFunction } from 'i18next';
import * as Yup from 'yup';
export const jobDetailsFormSchema = (t: TFunction<'onboarding', undefined>) => {
  return Yup.object().shape({
    title: Yup.string().required(t('validationMessages.titleRequired', { ns: 'common' })),
    company: Yup.string().required(t('validationMessages.companyNameRequired', { ns: 'common' }))
    // role: Yup.string().required(t('validationMessages.roleRequired', { ns: 'common' }))
  });
};
export const jobDetailsJDFormSchema = (t: TFunction<'onboarding', undefined>) => {
  return Yup.object()
    .shape({
      jobTitle: Yup.string(),
      companyName: Yup.string(),
      jobDesc: Yup.string().test('job-desc-conditional', '', function (value) {
        const { jobTitle, companyName } = this.parent;

        // All empty → valid
        if (!jobTitle && !companyName && !value) return true;

        // Required check
        if (!value) {
          return this.createError({
            message: t('validationMessages.jobDescRequired', {
              ns: 'common'
            })
          });
        }

        // Word count check
        const wordCount = value.trim().split(/\s+/).filter(Boolean).length;

        if (wordCount < 100) {
          return this.createError({
            message: t('validationMessages.jobDescriptionMinWords', {
              ns: 'common'
            })
          });
        }

        return true;
      })
    })
    .test(
      'all-or-none',
      t('validationMessages.allFieldsRequired', { ns: 'common' }),
      (values, context) => {
        const { jobTitle, companyName, jobDesc } = values || {};
        const anyFilled = !!jobTitle || !!companyName || !!jobDesc;
        if (!anyFilled) return true;
        const errors: Record<string, string> = {};
        if (!jobTitle) errors.jobTitle = t('validationMessages.titleRequired', { ns: 'common' });
        if (!companyName)
          errors.companyName = t('validationMessages.companyNameRequired', { ns: 'common' });
        if (!jobDesc) errors.jobDesc = t('validationMessages.jobDescRequired', { ns: 'common' });
        if (Object.keys(errors).length === 0) return true;
        // Set the error on the first missing field (Formik will show all if you submit)
        return context.createError({
          path: Object.keys(errors)[0],
          message: Object.values(errors)[0]
        });
      }
    );
};

export const signUpFormSchema = (t: TFunction<'auth', undefined>) => {
  return Yup.object().shape({
    emailAndPhone: Yup.string()
      .matches(
        /^(?:[0]?[6789]\d{9}|(?:\+[0-9]{1,3})?[0-9]{10}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
        t('validationMessages.invalidEmailPhone', { ns: 'common' })
      )
      .required(t('validationMessages.inputRequired', { ns: 'common' }))
  });
};
export const loginFormSchema = (t: TFunction<'auth', undefined>) => {
  return Yup.object().shape({
    emailAndPhone: Yup.string()
      .matches(
        /^(?:[0]?[6789]\d{9}|(?:\+[0-9]{1,3})?[0-9]{10}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
        t('validationMessages.invalidEmailPhone', { ns: 'common' })
      )
      .required(t('validationMessages.inputRequired', { ns: 'common' })),
    password: Yup.string().required(t('validationMessages.passwordRequired', { ns: 'common' }))
  });
};
