export function getFieldState({ formState, fieldState }) {
  return {
      error: formState.isSubmitted && fieldState.isTouched && !!fieldState.error,
      helperText: formState.isSubmitted && fieldState.isTouched && fieldState.error?.message
  }
}