declare class GetData {
    constructor();
    /**
     * Get the UUID from any nickname
     * @param {string} nick Nick to search id
     * @returns null | string
     */
    protected getUUID(nick: string): Promise<string | null>;
}
export { GetData };
//# sourceMappingURL=getData.d.ts.map