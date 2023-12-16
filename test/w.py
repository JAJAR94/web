import tkinter as tk
from PIL import Image, ImageTk
import os

class PharmacyItem:
    def __init__(self, name, price, stock):
        self.name = name
        self.price = price
        self.stock = stock
        self.quantity = 0

class PharmacyManagementSystem:
    def __init__(self, master):
        self.master = master
        master.title("Pharmacy Management System")

        # Get the directory of the current script
        current_directory = os.path.dirname(os.path.abspath(__file__))

        # Combine the script directory with the image file names
        menu_image_path = os.path.join(current_directory, "medmenu.jpg")
        charge_image_path = os.path.join(current_directory, "medcharge.jpg")

        # Open the images using the constructed paths
        self.menu_wallpaper_image = Image.open(menu_image_path)
        self.menu_wallpaper_image = self.menu_wallpaper_image.resize((800, 600))
        self.menu_wallpaper_photo = ImageTk.PhotoImage(self.menu_wallpaper_image)

        self.charge_wallpaper_image = Image.open(charge_image_path)
        self.charge_wallpaper_image = self.charge_wallpaper_image.resize((800, 600))
        self.charge_wallpaper_photo = ImageTk.PhotoImage(self.charge_wallpaper_image)

        self.frames = {}
        self.products = {
            'Paracetamol': PharmacyItem('Paracetamol', 10, 10),
            'Chlorpheniramine': PharmacyItem('Chlorpheniramine', 5, 5),
            'Semicon': PharmacyItem('Semicon', 15, 15),
            'Piperazine': PharmacyItem('Piperazine', 8, 20),
            'Betadine': PharmacyItem('Betadine', 12, 25),
            'Simethicone': PharmacyItem('Simethicone', 7, 12),
            'Oral Rehydration Salts': PharmacyItem('Oral Rehydration Salts', 18, 30),
            'Dimenhydrinate': PharmacyItem('Dimenhydrinate', 9, 18),
            'Normal saline solution': PharmacyItem('Normal saline solution', 14, 22),
            'Calamine Lotion': PharmacyItem('Calamine Lotion', 6, 8),

        }
        self.product_labels_stock = {}
        self.product_labels_charging = {}
        self.show_main_menu()

    def show_main_menu(self):
        self.clear_screen()
        frame = tk.Frame(self.master)
        frame.pack()
        self.frames["main_menu"] = frame

        # Use Label to display the menu image as a background for the main menu
        background_label = tk.Label(frame, image=self.menu_wallpaper_photo)
        background_label.place(x=0, y=0, relwidth=1, relheight=1)

        self.product_in_stock_button = tk.Button(frame, text="Product In Stock", command=self.show_product_in_stock)
        self.product_in_stock_button.pack()

        self.charging_button = tk.Button(frame, text="Charging", command=self.show_charging)
        self.charging_button.pack()

    

    
    def show_product_in_stock(self):
        self.clear_screen()
        frame = tk.Frame(self.master)
        frame.pack()
        self.frames["product_in_stock"] = frame

        # Use Label to display the product in stock image as a background
        product_image_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "medproduct.jpg")
        product_wallpaper_image = Image.open(product_image_path)
        product_wallpaper_image = product_wallpaper_image.resize((800, 600))
        self.product_wallpaper_photo = ImageTk.PhotoImage(product_wallpaper_image)

        background_label = tk.Label(frame, image=self.product_wallpaper_photo)
        background_label.place(x=0, y=0, relwidth=1, relheight=1)

        back_button = tk.Button(frame, text="Back", command=self.show_main_menu)
        back_button.grid(row=0, column=0)

        for i, (product_name, product) in enumerate(self.products.items()):
            label_text = f"{product.name} - {product.stock} - Cost: ${product.price}"
            label = tk.Label(frame, text=label_text)
            label.grid(row=i + 1, column=0)
            self.product_labels_stock[product.name] = label  # Store label reference

            plus_button = tk.Button(frame, text="+", command=lambda p=product: self.add_stock(p))
            plus_button.grid(row=i + 1, column=1)

            minus_button = tk.Button(frame, text="-", command=lambda p=product: self.subtract_stock(p))
            minus_button.grid(row=i + 1, column=2)

            # Create a button to show details for the specific medicine
            details_button = tk.Button(frame, text=f"Details - {product.name}", command=lambda p=product: self.show_medicine_details(p))
            details_button.grid(row=i + 1, column=3)



    def show_medicine_details(self, product):
        details_window = tk.Toplevel(self.master)
        details_window.title(f"Details - {product.name}")

        # Display details of the selected medicine
        details_label = tk.Label(details_window, text=f"Name: {product.name}\nStock: {product.stock}\nPrice: ${product.price}")
        details_label.pack()
        
    def show_charging(self):
        self.clear_screen()
        frame = tk.Frame(self.master)
        frame.pack()
        self.frames["charging"] = frame

        # Use Label to display the charge image as a background for the charging page
        background_label = tk.Label(frame, image=self.charge_wallpaper_photo)
        background_label.place(x=0, y=0, relwidth=1, relheight=1)

        back_button = tk.Button(frame, text="Back", command=self.show_main_menu)
        back_button.grid(row=0, column=0)

        bill_button = tk.Button(frame, text="Add Bill", command=self.generate_bill)
        bill_button.grid(row=1, column=0, pady=10)  # Adjust the placement if needed

        self.order_list = []
        self.total_cost = 0

        for i, (product_name, product) in enumerate(self.products.items()):
            label_text = f"{product.name} - {product.quantity} - Cost: ${product.price}"
            label = tk.Label(frame, text=label_text)
            label.grid(row=i + 2, column=0)  # Adjust the starting row if needed
            self.product_labels_charging[product.name] = label  # Store label reference

            plus_button = tk.Button(frame, text="+", command=lambda p=product: self.add_to_charging(p))
            plus_button.grid(row=i + 2, column=1)

            minus_button = tk.Button(frame, text="-", command=lambda p=product: self.subtract_from_charging(p))
            minus_button.grid(row=i + 2, column=2)
    def generate_bill(self):
        bill_window = tk.Toplevel(self.master)
        bill_window.title("Bill")
        bill_window.geometry("200x200")

        total_cost_label = tk.Label(bill_window, text=f"Total Cost: ${self.total_cost}")
        total_cost_label.pack()

        for i, product in enumerate(self.order_list):
            label_text = f"{product.name} - {product.quantity} - ${product.price}"
            label = tk.Label(bill_window, text=label_text)
            label.pack()

    def add_to_charging(self, product):
        if product.stock > 0:
            product.quantity += 1
            product.stock -= 1
            self.update_product_labels(product)
            self.order_list.append(product)
            self.total_cost += product.price
            print(f"{product.name} added to charging. Current total cost: {self.total_cost}")
        else:
            print(f"No more {product.name} in stock.")

    def subtract_from_charging(self, product):
        if product.quantity > 0:
            product.quantity -= 1
            product.stock += 1
            self.update_product_labels(product)

            if product in self.order_list:
                self.order_list.remove(product)
                self.total_cost -= product.price
            print(f"{product.name} removed from charging. Current total cost: {self.total_cost}")
        else:
            print(f"No {product.name} in charging.")

    def add_stock(self, product):
        if product.name in self.products:
            product.stock += 1
            self.update_product_labels(product)
            print(f"One unit of {product.name} added to stock. Current stock: {product.stock}")
        else:
            print(f"{product.name} not found in stock.")

    def subtract_stock(self, product):
        if product.name in self.products:
            if product.stock > 0:
                product.stock -= 1
                self.update_product_labels(product)
                print(f"One unit of {product.name} subtracted from stock. Current stock: {product.stock}")
            else:
                print(f"No more {product.name} in stock.")
        else:
            print(f"{product.name} not found in stock.")

    def update_product_labels(self, product):
        if product.name in self.product_labels_stock:
            label_text_stock = f"{product.name} - {product.stock} - Cost: ${product.price}"
            self.product_labels_stock[product.name].config(text=label_text_stock)

        if product.name in self.product_labels_charging:
            label_text_charging = f"{product.name} - {product.quantity} - Cost: ${product.price}"
            self.product_labels_charging[product.name].config(text=label_text_charging)

    def clear_screen(self):
        for widget in self.master.winfo_children():
            if isinstance(widget, tk.Toplevel):
                widget.destroy()
            else:
                widget.pack_forget()

root = tk.Tk()
my_gui = PharmacyManagementSystem(root)
root.mainloop()