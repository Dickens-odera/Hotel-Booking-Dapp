import { useState } from "react";

const useSetOwnerAddress = ()  =>{
    const [ownerAddress, setOwnerAddress] = useState('');
    return {
        ownerAddress
    }
}

export default useSetOwnerAddress;