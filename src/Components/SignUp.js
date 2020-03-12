import React, { useState, useRef, useEffect } from "react";
import { HashLink as Link } from "react-router-hash-link";

const initialState = {
    email: "",
    emailError: "", // Error if not a valid email
    password: "",
    passwordError: "", // Error if password length less than 8 characters
    password2: "",
    password2Error: "", // Error when password doesn't match
    //state variables for UI elements
    emailErrorTextColor: "form-text text-muted", // Text color of email error message
    emailInputBorder: "form-control", // Border color of email input
    pwd1TextColor: "form-text text-muted", // Text color of pwd1 error message
    pwd1InputBorder: "form-control", // Border color of pwd1 input
    pwd2TextColor: "form-text text-muted", // Text color of pwd2 error message
    pwd2InputBorder: "form-control" // Border color of pwd2 input
};

function SignUp() {
    const [account, setAccount] = useState(initialState);

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleSubmit = e => {
        e.preventDefault();

        if (account.email.length > 0) {
            if (account.password.length >= 8 && account.password2Error === "") {
                console.log("submitted");
                console.log(account);
                setAccount(initialState);
            } else {
            }
        } else {
            setAccount({
                ...account,
                emailError: "Please enter a valid email address",
                emailInputBorder: "form-control border-danger",
                emailErrorTextColor: "form-text text-left text-danger"
            });
        }
    };

    const validateEmail = e => {
        if (account.email.length > 0) {
            let validEmail = false;
            var re = /\S+@\S+\.\S+/;
            validEmail = re.test(e.target.value);
            if (validEmail) {
                setAccount({
                    ...account,
                    emailError: "",
                    emailInputBorder: "form-control",
                    emailErrorTextColor: "form-text text-left-text-muted"
                });
            } else {
                setAccount({
                    ...account,
                    emailError: "Please enter a valid email address",
                    emailInputBorder: "form-control border-danger",
                    emailErrorTextColor: "form-text text-left text-danger"
                });
            }
        }
    };

    const resetEmailError = () => {
        setAccount({
            ...account,
            emailError: "",
            emailInputBorder: "form-control",
            emailErrorTextColor: "form-text text-left-text-muted"
        });
    };
    const displayPwdLen = e => {
        setAccount({
            ...account,
            passwordError: "Minimum 8 characters",
            pwd1TextColor: "form-text text-left text-muted ",
            pwd1InputBorder: "form-control"
        });
    };

    const checkPwdLen = e => {
        console.log("Blr pwd1 Called");
        let pwd = e.target.value;
        console.log(pwd, pwd.length);
        if (pwd.length === 0 || pwd.length >= 8) {
            setAccount({ ...account, passwordError: "" });
        } else {
            setAccount({
                ...account,
                pwd1InputBorder: "form-control form-text border-danger",
                pwd1TextColor: "form-text text-left text-danger "
            });
        }
    };

    const checkPwdMatch = e => {
        console.log("Blr pwd2 Called");
        let pwd2 = e.target.value;
        console.log(pwd2);
        if (account.password !== pwd2) {
            setAccount({
                ...account,
                password2Error: "Passwords didn't match",
                pwd2TextColor: "form-text text-left text-danger",
                pwd2InputBorder: "form-control form-text border-danger"
            });
        } else {
            setAccount({
                ...account,
                password2Error: ""
            });
        }
    };

    const resetPwdMatch = () => {
        setAccount({
            ...account,
            password2Error: "",
            pwd2InputBorder: "form-control form-text"
        });
    };

    return (
        <div className="sign-up-outer">
            <div className="container">
                <div className="row mt-5 pt-5">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4 border border-info rounded p-5 ">
                        <h3 className="mb-4">Welcome!</h3>
                        <h4 className="mb-4"> Sign Up</h4>
                        {/* <hr /> */}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    className={account.emailInputBorder}
                                    placeholder="Email"
                                    onChange={e =>
                                        setAccount({
                                            ...account,
                                            email: e.target.value
                                        })
                                    }
                                    onFocus={resetEmailError}
                                    onBlur={validateEmail}
                                    value={account.email}
                                />
                                <small className={account.emailErrorTextColor}>
                                    {account.emailError}
                                </small>
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className={account.pwd1InputBorder}
                                    placeholder="Password"
                                    value={account.password}
                                    onChange={e =>
                                        setAccount({
                                            ...account,
                                            password: e.target.value
                                        })
                                    }
                                    onBlur={checkPwdLen}
                                    onFocus={displayPwdLen}
                                />
                                <small
                                    id="emailHelp"
                                    className={account.pwd1TextColor}
                                >
                                    {account.passwordError}
                                </small>
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className={account.pwd2InputBorder}
                                    placeholder="Retype password"
                                    value={account.password2}
                                    onChange={e =>
                                        setAccount({
                                            ...account,
                                            password2: e.target.value
                                        })
                                    }
                                    onBlur={checkPwdMatch}
                                    onFocus={resetPwdMatch}
                                />
                                <small className={account.pwd2TextColor}>
                                    {account.password2Error}
                                </small>
                            </div>
                            {/* <div> {account.password2Error
                    } </div> */}

                            <button
                                type="submit"
                                className="btn btn-info mt-3 px-5"
                            >
                                Sign up
                            </button>
                            <small
                                id="emailHelp"
                                className="form-text text-muted mt-2"
                            >
                                Already have an account?{" "}
                                <Link to="login" className="text-info">
                                    Login
                                </Link>
                            </small>
                        </form>
                    </div>
                    <div className="col-sm-4"></div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
