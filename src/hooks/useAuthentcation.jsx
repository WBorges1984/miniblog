import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [cancelled, setCancelled] = useState(false);

    const dbFirebase = db;
    const auth = getAuth();

    function CheckIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    const CreateUser = async (data) => {
        CheckIsCancelled();

        setLoading(true);
        setError(null);

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            await updateProfile(user, {
                displayName: data.displayName,
            });
            setLoading(false);
            return user;
        } catch (error) {
            console.log(error.message);
            console.log(typeof error.message);

            let systemErrorMessage;

            if (error.message.includes("Password")) {
                systemErrorMessage =
                    "A senha precisa conter pelo menos 6 caracteres.";
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado";
            } else {
                systemErrorMessage = "Ocorreu algum erro, tente mais tarde";
            }
            setLoading(false);
            setError(systemErrorMessage);
        }
    };

    const logout = () => {
        CheckIsCancelled();
        signOut(auth);
    };

    const login = async (data) => {
        CheckIsCancelled();
        setLoading(true);
        setError(false);

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            setLoading(false);
        } catch (error) {
            let systemErrorMessage;
            console.log(error.message);
            if (error.message.includes("user-not-found")) {
                systemErrorMessage = "Usuário não encontrado";
            } else if (error.message.includes("wrong-password")) {
                systemErrorMessage = "Senha incorreta";
            } else if (error.message.includes("invalid-credential")) {
                systemErrorMessage =
                    "Verifique se o email e/ou senha estão corretos ";
            } else {
                systemErrorMessage = "Ocorreu algum erro, tente mais tarde";
            }

            setError(systemErrorMessage);
            setLoading(false);
        }
    };

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        CreateUser,
        error,
        loading,
        logout,
        login,
    };
};
