import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import AuthService from "../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { routes } from "../utils/constants";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    loginEmail: "",
    loginPassword: "",
    registrationUsername: "",
    registrationPassword: "",
    registrationEmail: "",
    avatar: "",
  });

  const handleToggleLogin = () => {
    reset();
    setIsLogin(!isLogin);
  };

  const handleLogin = async (data) => {
    const body = {
      email: data.loginEmail,
      password: data.loginPassword,
    };

    try {
      setIsLoading(true);
      const response = await AuthService.login(body);
      if (response.status === 200) {
        toast.success(response?.data?.data?.message, {
          position: "bottom-center",
        });
        if (response?.data?.token) {
          localStorage.setItem("sessionToken", response?.data?.token);
        }
        if (response?.data?.data?.id) {
          localStorage.setItem("userId", response?.data?.data?.id);
        }
        setTimeout(() => {
          navigate(routes.ALL_CHATS);
        }, 5000);
      } else {
        console.log(response);
        toast.error(response?.data?.error, { position: "bottom-center" });
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Internal Error Occured", {
        position: "bottom-center",
      });
      setIsLoading(false);
    }
  };

  const handleSignUp = async (data) => {
    let body = {
      username: data.registrationUsername,
      email: data.registrationEmail,
      password: data.registrationPassword,
    };
    if (data?.avatar) {
      body.avatar = data.avatar;
    }

    try {
      setIsLoading(true);
      let response = await AuthService.registerNewUser(body);
      if (response.status === 200) {
        toast.success(response?.data?.message || "Registration", {
          position: "bottom-center",
        });
        setTimeout(() => {
          setIsLogin(true);
        }, 5000);
      } else {
        console.log(response);
        toast.error(response.data.error, { position: "bottom-center" });
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Internal Error Occured", { position: "bottom-center" });
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <Navbar />
      {isLogin ? (
        <div className="auth-content-wrapper">
          <div className="auth-header">Log in</div>
          <div className="auth-subtext">Welcome! Please enter your details</div>
          <div className="auth-details-container">
            <div className="auth-input-tag">Email Address</div>
            <input
              className="auth-input"
              placeholder="Enter Your Email"
              type="email"
              {...register("loginEmail", {
                required: "Email Address is Required!",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
                  message: "Please enter a Valid Email Address!",
                },
              })}
            />
            {errors?.loginEmail && (
              <div className="error-message">{errors?.loginEmail?.message}</div>
            )}
            <div className="auth-input-tag">Password</div>
            <input
              className="auth-input"
              placeholder="Enter Your Password"
              type="password"
              {...register("loginPassword", {
                required: "Password is Required!",
                minLength: {
                  value: 8,
                  message: "Password length must be more than 8",
                },
              })}
            />
            {errors?.loginPassword && (
              <div className="error-message">
                {errors?.loginPassword?.message}
              </div>
            )}
          </div>
          <div className="auth-change-context" onClick={handleToggleLogin}>
            Don't have an account? Signup
          </div>
          <Button text="Login" onPress={handleSubmit(handleLogin)} />
        </div>
      ) : (
        <div className="auth-content-wrapper">
          <div className="auth-header">Registration</div>
          <div className="auth-subtext">Welcome! Please enter your details</div>
          <div className="auth-details-container">
            <div className="auth-input-tag">Username</div>
            <input
              className="auth-input"
              placeholder="Enter Your Username"
              {...register("registrationUsername", {
                required: "Username is Required",
              })}
            />
            {errors?.registrationUsername && (
              <div className="error-message">
                {errors?.registrationUsername?.message}
              </div>
            )}
            <div className="auth-input-tag">Email Address</div>
            <input
              className="auth-input"
              placeholder="Enter Your Email"
              type="email"
              {...register("registrationEmail", {
                required: "Email Address is Required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
                  message: "Please enter a Valid Email Address!",
                },
              })}
            />
            {errors?.registrationEmail && (
              <div className="error-message">
                {errors?.registrationEmail?.message}
              </div>
            )}
            <div className="auth-input-tag" {...register("avatar")}>
              Avatar
            </div>
            <input className="auth-input" placeholder="Upload Your Avatar" />
            <div className="auth-input-tag">Password</div>
            <input
              {...register("registrationPassword", {
                required: "Password is Required",
                minLength: {
                  value: 8,
                  message: "Password length must be more than 8",
                },
              })}
              className="auth-input"
              placeholder="Enter Your Password"
              type="password"
            />
            {errors?.registrationPassword && (
              <div className="error-message">
                {errors?.registrationPassword?.message}
              </div>
            )}
          </div>
          <div className="auth-change-context" onClick={handleToggleLogin}>
            Already have an account? Login
          </div>
          <Button text="Sign Up" onPress={handleSubmit(handleSignUp)} />
        </div>
      )}
    </div>
  );
};

export default Auth;
