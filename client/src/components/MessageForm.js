import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/client";

const CREATE_MESSAGE = gql`
    mutation CreateMessage(
        $title: String!
        $content: String!
        $author: String!
    ) {
        createMessage(title: $title, content: $content, author: $author) {
            _id
            title
            content
            author
        }
    }
`;

const MessageForm = () => {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");

    const [createMessage] = useMutation(CREATE_MESSAGE);

    return (
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <div className="card">
                    <div className="card-body">
                        <form
                            onSubmit={ async (e) => {
                                e.preventDefault();
                                await createMessage({
                                    variables: { title, author, content },
                                });
                                window.location.href='/'
                            }}
                        >
                            <div className="form-group py-2">
                                <input
                                    type="text"
                                    placeholder="Author"
                                    className="form-control"
                                    onChange={(e) => setAuthor(e.target.value)}
                                    defaultValue={author}
                                    required
                                />
                            </div>

                            <div className="form-group py-2">
                                <input
                                    type="text"
                                    placeholder="Write a Title"
                                    className="form-control"
                                    onChange={(e) => setTitle(e.target.value)}
                                    defaultValue={title}
                                    required
                                />
                            </div>

                            <div className="form-group py-2">
                                <textarea
                                    placeholder="Content..."
                                    rows="2"
                                    className="form-control"
                                    onChange={(e) => setContent(e.target.value)}
                                    defaultValue={content}
                                    required
                                ></textarea>
                            </div>

                            <button className="btn btn-success btn-block ">
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageForm;
