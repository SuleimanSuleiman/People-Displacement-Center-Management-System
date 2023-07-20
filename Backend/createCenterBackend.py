import numpy as np
import sys
import skfuzzy as fuzz
from skfuzzy import control as ctrl

# تعريف المدخلات الضبابية
population_growth = ctrl.Antecedent(np.arange(0, 101, 1), 'population_growth')
building_resistance = ctrl.Antecedent(np.arange(0, 11, 1), 'building_resistance')

build_center = ctrl.Consequent(np.arange(0, 101, 1), 'build_center')

population_growth['low'] = fuzz.trimf(population_growth.universe, [0, 0, 20])
population_growth['medium'] = fuzz.trimf(population_growth.universe, [10, 50, 75])
population_growth['high'] = fuzz.trimf(population_growth.universe, [60, 100, 101])

building_resistance['low'] = fuzz.trimf(building_resistance.universe, [0, 0, 3])
building_resistance['medium'] = fuzz.trimf(building_resistance.universe, [2, 5, 7])
building_resistance['high'] = fuzz.trimf(building_resistance.universe, [6, 10, 11])

build_center['low'] = fuzz.trimf(build_center.universe, [0, 0, 20])
build_center['medium'] = fuzz.trimf(build_center.universe, [10, 50, 75])
build_center['high'] = fuzz.trimf(build_center.universe, [60, 100, 101])


rule1 = ctrl.Rule(population_growth['low'] | building_resistance['low'], build_center['low'])
rule2 = ctrl.Rule(population_growth['medium'] & building_resistance['medium'], build_center['medium'])
rule3 = ctrl.Rule(population_growth['high'] & building_resistance['high'], build_center['high'])
rule4 = ctrl.Rule(population_growth['low'] & building_resistance['medium'], build_center['low'])
rule5 = ctrl.Rule(population_growth['medium'] & building_resistance['low'], build_center['low'])
rule6 = ctrl.Rule(population_growth['high'] & building_resistance['low'], build_center['low'])
rule7 = ctrl.Rule(population_growth['low'] & building_resistance['high'], build_center['low'])
rule8 = ctrl.Rule(population_growth['medium'] & building_resistance['high'], build_center['medium'])
rule9 = ctrl.Rule(population_growth['high'] & building_resistance['medium'], build_center['medium'])


center_ctrl = ctrl.ControlSystem([rule1, rule2, rule3, rule4, rule5, rule6,rule7,rule8,rule9])
center = ctrl.ControlSystemSimulation(center_ctrl)

variables_received = sys.argv[1:]

center.input['population_growth'] = int(variables_received[0])
center.input['building_resistance'] = int(variables_received[1])

center.compute()

print(center.output['build_center'])
if center.output['build_center'] >= 49:
    print("Build")
else:
    print("Don't Build")