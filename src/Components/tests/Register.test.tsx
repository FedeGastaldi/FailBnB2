// src/Components/tests/Register.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Register from "../pages/Register";
import axios from "axios";
import { vi,} from "vitest";
import type { Mock } from "vitest";
import { ToastContainer } from "react-toastify";

vi.mock("axios");
const mockedAxios = axios as unknown as {
  post: Mock;
};

describe("Register", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("muestra errores si los campos obligatorios están vacíos", async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /registrarme/i }));

    expect(await screen.findAllByText(/obligatorio/i)).not.toHaveLength(0);
  });

  it("muestra error si las contraseñas no coinciden", async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Tu contraseña"), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByPlaceholderText("Repetí tu contraseña"), {
      target: { value: "654321" },
    });

    fireEvent.click(screen.getByRole("button", { name: /registrarme/i }));

    await waitFor(() => {
      expect(screen.getByText(/las contraseñas no coinciden/i)).toBeInTheDocument();
    });
  });

  it("realiza el registro correctamente", async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        usuario: {
          id: 1,
          nombre: "Federico",
          email: "fede@mail.com",
        },
      },
    });

    render(
      <BrowserRouter>
        <>
          <Register />
          <ToastContainer />
        </>
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Tu nombre"), {
      target: { value: "Federico" },
    });
    fireEvent.change(screen.getByPlaceholderText("Tu apellido"), {
      target: { value: "Gastaldi" },
    });
    fireEvent.change(screen.getByPlaceholderText("ejemplo@mail.com"), {
      target: { value: "fede@mail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Tu número de contacto"), {
      target: { value: "123456789" },
    });
    fireEvent.change(screen.getByPlaceholderText("Tu contraseña"), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByPlaceholderText("Repetí tu contraseña"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("checkbox", { name: /quiero ser anfitrión/i }));

    fireEvent.click(screen.getByRole("button", { name: /registrarme/i }));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        "http://localhost:3000/api/auth/register",
        {
          nombre: "Federico",
          apellido: "Gastaldi",
          email: "fede@mail.com",
          telefono: "123456789",
          pass: "123456",
          es_anfitrion: true,
        }
      );

      const usuarioEnStorage = localStorage.getItem("usuario");
      expect(usuarioEnStorage).toBeTruthy();
      expect(usuarioEnStorage).toContain("fede@mail.com");
    });
  });

  it("muestra error si el servidor responde con error", async () => {
    mockedAxios.post.mockRejectedValue({
      response: { data: { error: "Email ya registrado" } },
    });

    render(
      <BrowserRouter>
        <>
          <Register />
          <ToastContainer />
        </>
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("ejemplo@mail.com"), {
      target: { value: "fede@mail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Tu contraseña"), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByPlaceholderText("Repetí tu contraseña"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /registrarme/i }));

    await waitFor(() => {
      expect(screen.getByText(/email ya registrado/i)).toBeInTheDocument();
    });
  });
});
