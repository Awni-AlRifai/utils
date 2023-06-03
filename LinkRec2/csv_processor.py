import csv


def process_csv_file(file_path, row_handler, storage=[], *args):

    with open(file_path, 'r') as csvfile:
        csvreader = csv.reader(csvfile)

        # skip the first row
        next(csvreader)

        for row in csvreader:
            row_handler(row, storage, *args)

    return storage


def write_csv_file(file_name, data):
    # Open the file in write mode with newline=''
    with open(file_name, 'w', newline='') as file:
        writer = csv.writer(file)

        # Write the data to the CSV file
        writer.writerows(data)

    print(f"Data has been written to {file_name}.")
