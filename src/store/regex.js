export const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const passRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,20}$/;
export const nameRegExp = /^[A-Za-z]{2,20}$/;
export const genderRegExp = /^[A-Z]{4,6}$/;
export const titleRegExp = /[a-z].*?[a-z]/i;
export const contentRegExp = /(.*?)/;
