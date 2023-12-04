import { AcceptedLanguages } from '../../../types/code-lab.props';
import { Dispatch, SetStateAction } from 'react';
export interface HeaderProps {
    showCode: AcceptedLanguages;
    setShowCode: Dispatch<SetStateAction<AcceptedLanguages>>;
    isNightMode: boolean;
    setIsNightMode: Dispatch<SetStateAction<boolean>>;
    langs: Array<AcceptedLanguages>;
}
