import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { vi, describe, it, expect, beforeEach } from "vitest";
import type { Mock } from "vitest";


// Mock de axios
vi.mock("axios", () => {
  return {
    default: {
      post: vi.fn(),
    },
  };
});

// Casteo correcto del mock de axios
const mockedAxios = axios as unknown as {
  post: Mock;
};

describe("Login", () => {
  beforeEach(() => {
    localStorage.clear();
    mockedAxios.post.mockReset();
  });

  it("muestra errores de validación si los campos están vacíos", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    expect(await screen.findByText("Este campo es obligatorio")).toBeInTheDocument();
    expect(await screen.findByText("La contraseña es requerida")).toBeInTheDocument();
  });

  it("realiza el login correctamente", async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        usuario: { id: 1, nombre: "Federico", email: "fede@mail.com" },
      },
    });

    render(
      <BrowserRouter>
        <>
          <Login />
          <ToastContainer />
        </>
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Tu dirección Email"), {
      target: { value: "fede@mail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Tu contraseña"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith("http://localhost:3000/api/auth/login", {
        email: "fede@mail.com",
        pass: "123456",
      });
      expect(localStorage.getItem("usuario")).toContain("fede@mail.com");
    });
  });

  it("muestra error si el servidor responde con error", async () => {
    mockedAxios.post.mockRejectedValue({
      response: { data: { error: "Credenciales inválidas" } },
    });

    render(
      <BrowserRouter>
        <>
          <Login />
          <ToastContainer />
        </>
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Tu dirección Email"), {
      target: { value: "wrong@mail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Tu contraseña"), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(screen.getByText(/error: credenciales inválidas/i)).toBeInTheDocument();
    });
  });
});
