import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInsertDocuments } from "../../hooks/useinsertDocuments";
import styles from "./createPost.module.css";
const CreatePost = (props) => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState([]);

    const user = props.user;
    // const { user } = useAuthValue();

    const { insertDocument, response } = useInsertDocuments("posts");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        setFormError("");
        response.error = "";

        try {
            new URL(image);
        } catch (error) {
            setFormError("A imagem precisa ser uma URL");
        }

        const tagsArray = tags
            .split(",")
            .map((tag) => tag.trim().toLowerCase());

        if (!title || !image || !tags || !body) {
            setFormError("Por Favor, Preencha todos os campos");
        }

        if (formError) return;

        insertDocument({
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createBy: user.displayName,
        });

        navigate("/");
    };

    return (
        <div className={styles.create_post}>
            <h2>Criar Post</h2>
            <p>Escreva sobre o que quiser e compartilhe o seu conhecimento</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Título</span>
                    <input
                        type="text"
                        name="title"
                        required
                        placeholder="Pense em um bom título..."
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </label>
                <label>
                    <span>Url da imagem</span>
                    <input
                        type="text"
                        name="title"
                        required
                        placeholder="Insira um imagem que representa o seu post"
                        onChange={(e) => setImage(e.target.value)}
                        value={image}
                    />
                </label>
                <label>
                    <span>Conteúdo</span>
                    <textarea
                        name="body"
                        required
                        placeholder="Insira o conteúdo do post"
                        onChange={(e) => setBody(e.target.value)}
                        value={body}
                    />
                </label>
                <label>
                    <span>Tags</span>
                    <input
                        type="text"
                        name="tags"
                        required
                        placeholder="Insira as tags separadas por vírgulas"
                        onChange={(e) => setTags(e.target.value)}
                        value={tags}
                    />
                </label>
                {!response.loading && (
                    <button className="btn">Cadastrar</button>
                )}
                {response.loading && (
                    <button className="btn" disabled>
                        Aguarde...
                    </button>
                )}
                {response.error && <p className="error">{response.error}</p>}
                {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    );
};

export default CreatePost;
