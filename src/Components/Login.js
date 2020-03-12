import React, { useState, useRef, useEffect } from "react";
import { HashLink as Link } from "react-router-hash-link";

const initialState = {
    email: "",
    password: "",
    passwordError: "", // Error if password length less than 8 characters
    //state variables for UI elements
    emailErrorTextColor: "form=-text text-muted", // Text color of email error message
    emailInputBorder: "form-control", // Border color of email input
    pwd1TextColor: "form-text text-muted", // Text color of pwd1 error message
    pwd1InputBorder: "form-control" // Border color of pwd1 input
};

function Login() {
    const [account, setAccount] = useState(initialState);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const validateEmail = e => {
        let emaill = account.email;
        if (emaill.length > 0) {
            var validEmail = false;
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

    const resetEmailError = e => {
        setAccount({
            ...account,
            emailError: "",
            emailInputBorder: "form-control",
            emailErrorTextColor: "form-text text-left-text-muted"
        });
    };
    const checkPwdLen = e => {
        console.log("blur pwd called");
        let pwd = e.target.value;
        if (pwd.length > 0 && pwd.length < 8) {
            setAccount({
                ...account,
                passwordError: "Incorrect password",
                pwd1InputBorder: "form-control form-text border-danger",
                pwd1TextColor: "form-text text-left text-danger "
            });
        } else {
            setAccount({
                ...account,
                passwordError: "",
                pwd1TextColor: "form-text text-left text-muted ",
                pwd1InputBorder: "form-control"
            });
        }
    };
    const resetPwdLengthError = e => {
        setAccount({
            ...account,
            passwordError: "",
            pwd1TextColor: "form-text text-left text-muted ",
            pwd1InputBorder: "form-control"
        });
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (account.email.length > 0) {
            if (account.passwordError === "") {
                console.log(account);
                setAccount(initialState);
            }
        } else {
            setAccount({
                ...account,
                emailError: "Please enter a valid email",
                emailInputBorder: "form-control border-danger",
                emailErrorTextColor: "form-text text-left text-danger"
            });
        }
    };

    return (
        <div className="login-outer">
            <div className="container">
                <div className="row mt-5 pt-5">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4 border border-info rounded p-5 ">
                        <h3 className="mb-4">Welcome to Silzila!</h3>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group" draggable="true">
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
                                    id="exampleInputPassword1"
                                    placeholder="Password"
                                    value={account.password}
                                    onChange={e =>
                                        setAccount({
                                            ...account,
                                            password: e.target.value
                                        })
                                    }
                                    onBlur={checkPwdLen}
                                    onFocus={resetPwdLengthError}
                                />
                                <small
                                    id="emailHelp"
                                    className={account.pwd1TextColor}
                                >
                                    {account.passwordError}
                                </small>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-info mt-3 px-5"
                            >
                                Login
                            </button>
                            <small
                                id="emailHelp"
                                className="form-text text-muted"
                            >
                                Already have an account?{" "}
                                <Link to="signup" className="text-info">
                                    Sign Up
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

export default Login;
