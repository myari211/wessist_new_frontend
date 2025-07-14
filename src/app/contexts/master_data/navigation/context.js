import { createSafeContext } from "utils/createSafeContext";

export const [MasterDataNavigationContextt, useMasterDataNavigationContext] = createSafeContext(
    "useMasterDataNavigationContext must be used within MasterDataNavigationContext"
);
