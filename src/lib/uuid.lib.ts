export function isUUID(uuid: string): boolean {
    const uuidRegex =
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/; // Match any version uuid
    return uuidRegex.test(uuid);
}
