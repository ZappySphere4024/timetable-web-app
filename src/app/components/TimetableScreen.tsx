import { useState } from 'react';
import { Plus, Clock, Pencil, Trash2 } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { TimePicker12 } from './ui/time-picker-12';

interface Class {
  id: number;
  subject: string;
  time: string;
  color: string;
  day: string;
}

export function TimetableScreen() {
  const [classes, setClasses] = useState<Class[]>([
    { id: 1, subject: 'Mathematics', time: '09:00 AM', color: 'bg-primary', day: 'Monday' },
    { id: 2, subject: 'Physics', time: '11:00 AM', color: 'bg-secondary', day: 'Monday' },
    { id: 3, subject: 'Chemistry', time: '02:00 PM', color: 'bg-accent', day: 'Monday' },
    { id: 4, subject: 'English', time: '09:00 AM', color: 'bg-primary', day: 'Tuesday' },
    { id: 5, subject: 'Computer Science', time: '11:00 AM', color: 'bg-accent', day: 'Tuesday' },
    { id: 6, subject: 'Biology', time: '02:00 PM', color: 'bg-secondary', day: 'Tuesday' },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);

  const [subject, setSubject] = useState('');
  const [day, setDay] = useState('Monday');
  const [date, setDate] = useState<Date | undefined>(new Date());

  const formatTime = (date: Date | undefined) => {
    if (!date) return '';
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const handleAddClass = () => {
    if (subject && date && day) {
      const newClass = {
        id: Date.now(),
        subject,
        time: formatTime(date),
        day,
        color: 'bg-primary', // You can add a color picker later
      };
      setClasses([...classes, newClass]);
      setIsAddDialogOpen(false);
      setSubject('');
      setDate(new Date());
      setDay('Monday');
    }
  };

  const handleEditClass = () => {
    if (editingClass && subject && date && day) {
      const updatedClasses = classes.map((c) =>
        c.id === editingClass.id ? { ...c, subject, time: formatTime(date), day } : c
      );
      setClasses(updatedClasses);
      setIsEditDialogOpen(false);
      setEditingClass(null);
      setSubject('');
      setDate(new Date());
      setDay('Monday');
    }
  };

  const handleRemoveClass = (id: number) => {
    setClasses(classes.filter((c) => c.id !== id));
  };

  const openEditDialog = (classItem: Class) => {
    setEditingClass(classItem);
    setSubject(classItem.subject);
    const timeParts = classItem.time.split(' ');
    const [hours, minutes] = timeParts[0].split(':');
    const period = timeParts[1];
    const newDate = new Date();
    let hours_24 = parseInt(hours);
    if (period === 'PM' && hours_24 < 12) {
        hours_24 += 12;
    }
    if (period === 'AM' && hours_24 === 12) {
        hours_24 = 0;
    }
    newDate.setHours(hours_24);
    newDate.setMinutes(parseInt(minutes));
    setDate(newDate);
    setDay(classItem.day);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="pb-24 pt-6 px-4 space-y-4 overflow-y-auto" style={{ height: 'calc(100vh - 5rem)' }}>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-1">Class Timetable</h2>
        <p className="text-muted-foreground text-sm">Manage your weekly schedule</p>
      </div>

      {/* Classes List */}
      <div className="space-y-4">
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => {
          const dayClasses = classes.filter((c) => c.day === day);
          
          return (
            <div key={day}>
              <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">
                {day}
              </h3>
              <div className="space-y-2">
                {dayClasses.length > 0 ? (
                  dayClasses.map((classItem) => (
                    <Card key={classItem.id} className="p-4 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className={`w-1 h-16 ${classItem.color} rounded-full`} />
                        <div className="flex-1">
                          <h4 className="font-semibold">{classItem.subject}</h4>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <Clock className="w-4 h-4" />
                            <span>{classItem.time}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="rounded-lg" onClick={() => openEditDialog(classItem)}>
                          <Pencil className="w-4 h-4 text-muted-foreground" />
                        </Button>
                        <Button variant="ghost" size="sm" className="rounded-lg" onClick={() => handleRemoveClass(classItem.id)}>
                          <Trash2 className="w-4 h-4 text-muted-foreground" />
                        </Button>
                      </div>
                    </Card>
                  ))
                ) : (
                  <Card className="p-4 rounded-xl bg-muted">
                    <p className="text-sm text-muted-foreground text-center">No classes scheduled</p>
                  </Card>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Class Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogTrigger asChild>
          <Button
            className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
            size="icon"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a new class</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Mathematics" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <TimePicker12 date={date} setDate={setDate} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="day">Day</Label>
              <Select value={day} onValueChange={setDay}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Monday">Monday</SelectItem>
                  <SelectItem value="Tuesday">Tuesday</SelectItem>
                  <SelectItem value="Wednesday">Wednesday</SelectItem>
                  <SelectItem value="Thursday">Thursday</SelectItem>
                  <SelectItem value="Friday">Friday</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => {
                setSubject('');
                setDate(new Date());
                setDay('Monday');
              }}>Cancel</Button>
            </DialogClose>
            <Button onClick={handleAddClass}>Add Class</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Class Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit class</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Mathematics" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <TimePicker12 date={date} setDate={setDate} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="day">Day</Label>
              <Select value={day} onValueChange={setDay}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Monday">Monday</SelectItem>
                  <SelectItem value="Tuesday">Tuesday</SelectItem>
                  <SelectItem value="Wednesday">Wednesday</SelectItem>
                  <SelectItem value="Thursday">Thursday</SelectItem>
                  <SelectItem value="Friday">Friday</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => {
                setEditingClass(null);
                setSubject('');
                setDate(new Date());
                setDay('Monday');
              }}>Cancel</Button>
            </DialogClose>
            <Button onClick={handleEditClass}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}