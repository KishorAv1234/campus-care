"use client"

import type React from "react"

import { useState, useCallback } from "react"

interface FormState<T> {
  values: T
  errors: Partial<Record<keyof T, string>>
  touched: Partial<Record<keyof T, boolean>>
  isSubmitting: boolean
}

type ValidationRules<T> = Partial<Record<keyof T, (value: any, values: T) => string | undefined>>

interface UseFormOptions<T> {
  initialValues: T
  validationRules?: ValidationRules<T>
  onSubmit: (values: T) => Promise<void> | void
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validationRules = {},
  onSubmit,
}: UseFormOptions<T>) {
  const [state, setState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
  })

  const validateField = useCallback(
    (name: keyof T, value: any) => {
      const rule = validationRules[name]
      return rule ? rule(value, state.values) : undefined
    },
    [validationRules, state.values],
  )

  const validateForm = useCallback(() => {
    const errors: Partial<Record<keyof T, string>> = {}
    let isValid = true

    Object.keys(state.values).forEach((key) => {
      const fieldKey = key as keyof T
      const error = validateField(fieldKey, state.values[fieldKey])
      if (error) {
        errors[fieldKey] = error
        isValid = false
      }
    })

    setState((prev) => ({ ...prev, errors }))
    return isValid
  }, [state.values, validateField])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target
      const fieldValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value

      setState((prev) => ({
        ...prev,
        values: { ...prev.values, [name]: fieldValue },
        touched: { ...prev.touched, [name]: true },
      }))

      const error = validateField(name as keyof T, fieldValue)
      setState((prev) => ({
        ...prev,
        errors: { ...prev.errors, [name]: error },
      }))
    },
    [validateField],
  )

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name } = e.target
      setState((prev) => ({
        ...prev,
        touched: { ...prev.touched, [name]: true },
      }))

      const error = validateField(name as keyof T, state.values[name as keyof T])
      setState((prev) => ({
        ...prev,
        errors: { ...prev.errors, [name]: error },
      }))
    },
    [state.values, validateField],
  )

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      // Mark all fields as touched
      const touchedFields = Object.keys(state.values).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {} as Partial<Record<keyof T, boolean>>,
      )

      setState((prev) => ({
        ...prev,
        touched: touchedFields,
      }))

      if (validateForm()) {
        setState((prev) => ({ ...prev, isSubmitting: true }))
        try {
          await onSubmit(state.values)
        } catch (error) {
          console.error("Form submission error:", error)
        } finally {
          setState((prev) => ({ ...prev, isSubmitting: false }))
        }
      }
    },
    [state.values, validateForm, onSubmit],
  )

  const setFieldValue = useCallback(
    (name: keyof T, value: any) => {
      setState((prev) => ({
        ...prev,
        values: { ...prev.values, [name]: value },
      }))

      const error = validateField(name, value)
      setState((prev) => ({
        ...prev,
        errors: { ...prev.errors, [name]: error },
      }))
    },
    [validateField],
  )

  const resetForm = useCallback(() => {
    setState({
      values: initialValues,
      errors: {},
      touched: {},
      isSubmitting: false,
    })
  }, [initialValues])

  return {
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    isSubmitting: state.isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    resetForm,
  }
}
