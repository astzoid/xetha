#!/bin/bash
set -e

if [[ $EUID -ne 0 ]]; then
    echo "* This script must be executed with root privileges (sudo)." 1>&2
    exit 1
fi

USERNAME=''
PASSWORD=''

getPassword() {

    read -sp 'Enter Password: ' p1
    read -sp 'Re-enter Password: ' p2

    if [ $p1 != $p2 ]; then
        echo "Wrong password, did not matched"
        getPassword
    elif; then
        PASSWORD=$p2
    fi

}

prompts() {
    read -p 'Enter Username: ' username
    USERNAME=$username
    getPassword
}

updateLinux() {
    apt update -q -y && apt upgrade -y
}

setupNginx() {
    apt -y install nginx
    systemctl stop nginx
}

setupFirewall() {
    ufw allow ssh
    ufw allow http
    ufw allow https
    ufw enable
    ufw status
}

setupUser() {
    adduser $USERNAME -p $PASSWORD
    usermod -aG sudo $username
}

main() {
    prompts
    updateLinux
    setupFirewall
    setupFirewall
    setupUser
    logout
}

main