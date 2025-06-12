// core/gl-core/lib/normalizeError.ts

export function normalizeError(error: unknown): string {
  if (error == null) return 'An unknown error occurred.';

  if (typeof error === 'string') return error;

  if (error instanceof Error) return error.message;

  if (typeof error === 'object' && 'error' in error) {
    const err = error as any;

    if (typeof err.error?.message === 'string') {
      // Use the high-level message if it exists
      return err.error.message;
    }

    // If not, try to use the first entry in the errors array
    if (Array.isArray(err.error?.errors) && err.error.errors.length > 0) {
      const fallback = err.error.errors[0].message;
      if (typeof fallback === 'string') return fallback;
    }
  }

  return 'Something went wrong. Please try again.';
}
