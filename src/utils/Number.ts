export function justNumbers(input: string): string {
    return input.replace(/[^\d]/g, '');
}