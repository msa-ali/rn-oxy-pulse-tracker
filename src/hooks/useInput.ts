import {useState} from 'react';

const useInput = <T>(initialValue: T) => {
    const [value, setValue] = useState(initialValue);

    const onChange = (val: T) => setValue(val);
    
    return {value, onChange};
};

export default useInput;