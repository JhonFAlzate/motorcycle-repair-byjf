

export const protectAccountOwner = (ownerUserId: number , sessionUserId: number) => {
    if (ownerUserId !== sessionUserId) {
        return false;
    }
    return true;

}