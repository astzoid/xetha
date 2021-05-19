import environment from '@auth/environment';

export default function Login() {
    window.location.href = `${environment.http}/api/login`;
}
