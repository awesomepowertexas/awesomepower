name = "Lone Star Energy"
ptc_name = "Lone Star Energy"
start_texts = ["The average price above"]


def a(numbers, tdu_charge, tdu_rate):
    charge_function = [[0, numbers[1]]]
    rate_function = [[0, numbers[0] / 100]]
    return (charge_function, rate_function)
