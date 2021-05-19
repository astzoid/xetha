import { useLocation } from 'react-router-dom';

export default function useQueryParams() {
    const location = useLocation();
    return new URLSearchParams(location.search);
}
