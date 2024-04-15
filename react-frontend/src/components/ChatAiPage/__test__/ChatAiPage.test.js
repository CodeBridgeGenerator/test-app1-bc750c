import React from "react";
import { render, screen } from "@testing-library/react";

import ChatAiPage from "../ChatAiPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders chatAi page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ChatAiPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("chatAi-datatable")).toBeInTheDocument();
    expect(screen.getByRole("chatAi-add-button")).toBeInTheDocument();
});
