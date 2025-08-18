# =======================================
# To-Do List Backend
# =======================================

#define the structure of a todo list item
class Task:
    def __init__(self, task_id, description, completed=False):
        self.id = task_id
        self.description = description
        self.completed = completed


# Part 1: Initialization
def new_list():
    """
    Create and return a new empty to-do list data structure.
    This could be a list or dictionary depending on design.
    """
    return {
        "tasks": [],
        "next_id": 1
        }


# Part 2: Adding Tasks
def add_task(todo_list, description):
    """
    Add a new task to the todo_list.
    
    Arguments:
    - todo_list: the current to-do list structure
    - description: string describing the task
    
    Each task should include:
    - A unique ID (incrementing number or similar)
    - The description text
    - A completion status (default = False)
    """
    task = Task(
         task_id = todo_list["next_id"],
        description= description,
        completed= False
    )
    todo_list["tasks"].append(task)
    todo_list["next_id"] += 1
    


# Part 3: Listing Tasks
def list_tasks(todo_list):
    """
    List all tasks currently in todo_list.
    
    Each task should include:
    - ID
    - Description
    - Completion status
    
    Returns:
    - A collection of tasks or prints them (your choice)
    """
    for task in todo_list["tasks"]:
        print(f"ID: {task.id}, Description: {task.description}, Completed: {task.completed}")


# Part 4: Completing Tasks
def complete_task(todo_list, task_id):
    """
    Mark the task with the given ID as completed.
    
    Arguments:
    - todo_list: the current to-do list
    - task_id: ID of the task to be completed
    
    Behavior:
    - Find the task by ID
    - Update its completion status to True
    - If the task does not exist, return False or an error

    """
    for task in todo_list["tasks"]:
        if task.id == task_id:
            task.completed = True
            return True
    return False


# Part 5: (Optional) Deleting Tasks
def delete_task(todo_list, task_id):
    """
    Remove the task with the given ID from the todo_list.
    
    Arguments:
    - todo_list: the current to-do list
    - task_id: ID of the task to delete
    """
    for task in todo_list["tasks"]:
        if task.id == task_id:
            todo_list["tasks"].remove(task)
            return True
    return False


# Part 6: (Optional Demo Flow)
def demo():
    """
    Demonstrate basic functionality:
    - Create a new list
    - Add a few tasks
    - Mark one as complete
    - Show current tasks
    - Optionally delete a task
    
    Note: This function should just call the others in sequence.
    """
     # Create a new empty to-do list
    my_list = new_list()
    
    # Add some tasks
    add_task(my_list, "Buy groceries")
    add_task(my_list, "Walk the dog")
    add_task(my_list, "Finish homework")
    complete_task(my_list, 1)
    # Print all tasks
    list_tasks(my_list)
    delete_task(my_list, 1)
    list_tasks(my_list)   




# Stretch Goal: Sorting Tasks
def sort_tasks(todo_list, mode):
    """
    Sort tasks in the todo_list based on mode.
    
    Arguments:
    - todo_list: the current to-do list
    - mode: string determining the sort behavior
        "by_status" → incomplete first, then complete
        "by_description" → alphabetical order
        "by_id" → default creation order
    
    Returns:
    - A new sorted list (or the same list rearranged)
    """
    pass


# Run the test if this file is executed directly
if __name__ == "__main__":
    demo()