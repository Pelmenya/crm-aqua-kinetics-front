import { FC } from "react";
import { TWorkDay } from "@/shared/lib/types/t-work-day";
import { WeeklyDayPicker } from "../weekly-day-picker/weekly-day-picker";
import { WorkDayEditorModal } from "../work-day-editor-modal/work-day-editor-modal";
import { Base } from "@/shared/ui/components/base/base";
import { TNullable } from "@/shared/lib/types/t-nullable";

type ServiceWeeklyProps = {
    workDays: TNullable<TWorkDay[]>;
    selectedWorkDay: TWorkDay | null;
    isEditorOpen: boolean;
    onDaySelect: (day: TWorkDay) => void;
    onEditorSave: (updatedDay: TWorkDay) => void;
    onRemove: () => void;
    onCloseEditor: () => void;
};

export const ServiceWeekly: FC<ServiceWeeklyProps> = ({
    workDays,
    selectedWorkDay,
    isEditorOpen,
    onDaySelect,
    onEditorSave,
    onRemove,
    onCloseEditor
}) => {
    return (
        <div className="flex flex-col items-center justify-center px-4">
            <h1 className="text-xl font-bold">Еженедельное расписание</h1>
            <p>Управляйте своим расписанием.</p>
            <p className="text-center mb-4">Изменить конкретную дату можно на вкладке календаря</p>
            <Base>
                <WeeklyDayPicker workDays={workDays || []} onDaySelect={onDaySelect} />
            </Base>
            {selectedWorkDay && (
                <WorkDayEditorModal
                    isOpen={isEditorOpen}
                    workDay={selectedWorkDay}
                    onClose={onCloseEditor}
                    onSave={onEditorSave}
                    onRemove={onRemove}
                />
            )}
        </div>
    );
};
