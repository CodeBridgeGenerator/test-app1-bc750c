import React from "react";
import { render, screen } from "@testing-library/react";

import ChatAiEditDialogComponent from "../ChatAiEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders chatAi edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ChatAiEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("chatAi-edit-dialog-component")).toBeInTheDocument();
});
