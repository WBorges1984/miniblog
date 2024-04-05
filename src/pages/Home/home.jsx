import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./home.module.css";

const Home = () => {
    const [query, setQuery] = useState("");
    const [posts] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className={styles.home}>
            <h1>Veja nossos posts mais recentes</h1>
            <form action={handleSubmit} className={styles.search_form}>
                <input
                    type="text"
                    placeholder="Ou busque por Tags..."
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                />
                <button className="btn btn-dark">Pesquisar</button>
            </form>
            <div>
                <h1>Posts...</h1>
                {posts && posts.length === 0 && (
                    <div className={styles.noposts}>
                        <p>Não foram encontrados posts</p>
                        <Link to="/posts/create" className="btn">
                            Criar primeiro post
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
