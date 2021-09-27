export function pluralizeStr(
    str: string,
    count: number,
    suffix: string
): string {
    return `${count} ${str}${count > 1 ? suffix : ''}`;
}
