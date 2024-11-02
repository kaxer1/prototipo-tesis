export interface ModelsOpenAI {
    id:       string;
    object:   string;
    created:  number;
    owned_by: string;
}

// inicio File Vector Store
export interface FileVectorStorage {
    id:              string;
    object:          string;
    created_at:      number;
    status:          string;
    vector_store_id: string;
    file_counts:     FileCounts;
}

interface FileCounts {
    in_progress: number;
    completed:   number;
    failed:      number;
    cancelled:   number;
    total:       number;
}
// fin File Vector Store

// Inicio AssistantCreate
export interface AssistantCreated {
    id:              string;
    object:          string;
    created_at:      number;
    name:            string;
    description:     null;
    model:           string;
    instructions:    string;
    tools:           Tool[];
    tool_resources:  ToolResources;
    metadata:        any;
    top_p:           number;
    temperature:     number;
    response_format: string;
}
interface ToolResources {
    file_search: FileSearch;
}

interface FileSearch {
    vector_store_ids: string[];
}

interface Tool {
    type: string;
}
// fin AssistantCreate
