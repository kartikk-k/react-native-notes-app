import { useContext, createContext, useState } from "react";
import AuthContext from "./AuthContext";
import supabase from "../utils/SupabaseClient";

const NotesContext = createContext()
export default NotesContext

export const NotesProvider = ({ children }) => {
    let { isAuthenticated, userId } = useContext(AuthContext)

    const [note, setNote] = useState({})
    const [folderNotes, setFolderNotes] = useState([])
    const [notesFolder, setNotesFolder] = useState([])


    // get all folders
    const getNoteFolders = async () => {
        if (isAuthenticated) {
            try {
                let { data, error } = await supabase
                    .from("NotesFolder")
                    .select("id, title")
                    .eq("user_id", userId)

                if (data) {
                    console.log(data)
                    setNotesFolder(data)
                } if (error) {
                    console.log("Error fetching note folders: ", error)
                }
            }
            catch { }
        }
    }

    // get all notes of single folder
    const getFolderNotes = async (notes_id) => {
        if (isAuthenticated) {
            try {
                let { data, error } = await supabase
                    .from("Notes")
                    .select("id, title")
                    .eq("NotesFolder", notes_id)

                if (data) {
                    setFolderNotes(data)
                } if (error) {
                    console.log("Error fetching notes from folder: ", error)
                }

            } catch { }
        }
    }

    // get single note data
    const getNote = async (note_id) => {
        if (isAuthenticated) {
            try {
                let { data, error } = await supabase
                    .from("Notes")
                    .select("id, title, description")
                    .eq("id", note_id)
                    .single()

                if (data) {
                    console.log("notesData: ", data.title)
                    setNote(data)
                } if (error) {
                    console.log("Error fetching note data: ", error)
                }

            } catch (error) {
                console.log("Error fetching note: ", error)
            }
        }
    }


    // making variable available to be used
    let contextData = {
        note: note,
        folderNotes: folderNotes,
        notesFolder: notesFolder,
        getNoteFolders: getNoteFolders,
        getFolderNotes: getFolderNotes,
        getNote: getNote,

    }

    return (
        <NotesContext.Provider value={contextData} >
            {children}
        </NotesContext.Provider>
    )
}