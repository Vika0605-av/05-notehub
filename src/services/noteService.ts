import axios from "axios";

import type { AxiosResponse } from "axios";

import  type { Note, NoteTag } from "../types/note"

const token = import.meta.env.VITE_NOTENHUB_TOKEN;

const api = axios.create({

  baseURL: "https://notehub-public.goit.study/api",

  headers: {

    Authorization: `Bearer ${token}`,

  },

});

export interface FetchNotesParams {

  page: number;

  perPage: number;

  search?: string;

}

export interface FetchNotesResponse {

  notes: Note[];

  totalPages: number;

  currentPage: number;

}

export interface CreateNoteData {

  title: string;

  content: string;

  tag: NoteTag;

}

export const fetchNotes = async (

  params: FetchNotesParams

): Promise<FetchNotesResponse> => {

  const response: AxiosResponse<FetchNotesResponse> =

    await api.get("/notes", {

      params,

    });

  return response.data;

};

export const createNote = async (

  data: CreateNoteData

): Promise<Note> => {

  const response: AxiosResponse<Note> =

    await api.post("/notes", data);

  return response.data;

};

export const deleteNote = async (

  id: string

): Promise<Note> => {

  const response: AxiosResponse<Note> =

    await api.delete(`/notes/${id}`);

  return response.data;
};