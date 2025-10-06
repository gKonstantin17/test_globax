import { useState, useEffect } from "react";
import { getAll, searchUsers } from "./api";
import "./App.css";

function App() {
    const [data, setData] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        get();
    }, []);

    const get = async () => {
        const result = await getAll();
        setData(result.data);
    };

    const search = async (request) => {
        const result = await searchUsers(request);
        setData(result.data);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            search(searchTerm);
        } else {
            get();
        }
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value === "") {
            get();
        }
    };
    const formatDate = (dateString) => {
        const months = {
            'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
            'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
            'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
        };

        const parts = dateString.split(' ');
        if (parts.length === 3) {
            const month = months[parts[0]];
            const day = parts[1].replace(',', '').padStart(2, '0');
            const year = parts[2];
            return `${day}.${month}.${year}`;
        }
        return dateString;
    };

    return (
        <div className="app">
            <div className="container">
                {/* Поисковая строка */}
                <div className="search-container">
                    <form onSubmit={handleSearch} className="search-form">
                        <input
                            type="text"
                            placeholder="Поиск..."
                            value={searchTerm}
                            onChange={handleInputChange}
                            className="search-input"
                        />
                        <button type="submit" className="search-button">
                            <img src="/assets/search.svg" alt="Search" />
                        </button>
                    </form>
                </div>

                {/* Сетка пользователей */}
                <div className="users-grid">
                    {data?.map((user) => (
                        <div
                            key={user.id}
                            className="user-card"
                            onClick={() => setSelectedUser(user)}
                        >
                            <h2 className="user-name">{user.name}</h2>
                            <div className="user-contacts">
                                <div className="contact-item">
                                    <img src="/assets/phone.svg" alt="Phone" />
                                    <span>{user.phone}</span>
                                </div>
                                <div className="contact-item">
                                    <img src="/assets/message.svg" alt="Email" />
                                    <span>{user.email}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Модальное окно */}
                {selectedUser && (
                    <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
                        <div className="modal" onClick={(e) => e.stopPropagation()}>
                            <button
                                className="close-button"
                                onClick={() => setSelectedUser(null)}
                            >
                                ×
                            </button>

                            <h2 className="modal-name">{selectedUser.name}</h2>

                            <div className="modal-info">
                                <div className="info-item">
                                    <strong>Телефон:</strong>
                                    <span>{selectedUser.phone}</span>
                                </div>
                                <div className="info-item">
                                    <strong>Почта:</strong>
                                    <span>{selectedUser.email}</span>
                                </div>
                                <div className="info-item">
                                    <strong>Дата найма:</strong>
                                    <span>{formatDate(selectedUser.hire_date)}</span>
                                </div>
                                <div className="info-item">
                                    <strong>Должность:</strong>
                                    <span>{selectedUser.position_name}</span>
                                </div>
                                <div className="info-item">
                                    <strong>Отдел:</strong>
                                    <span>{selectedUser.department}</span>
                                </div>
                            </div>

                            <div className="additional-info">
                                <h3>Дополнительная информация</h3>
                                <p>
                                    Разработчики используют текст в качестве заполнителя макта страницы.
                                    Разработчики используют текст в качестве заполнителя макта страницы.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;