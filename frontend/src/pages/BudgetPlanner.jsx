import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { useTrips } from '../context/TripContext';
import { DollarSign, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

export const BudgetPlanner = () => {
  const { trips } = useTrips();

  const totalBudget = trips.reduce((sum, trip) => sum + trip.budget, 0);
  const totalSpent = trips.reduce((sum, trip) => sum + trip.spent, 0);
  const remaining = totalBudget - totalSpent;

  const allExpenses = trips.flatMap(trip =>
    trip.expenses.map(expense => ({
      ...expense,
      tripTitle: trip.title,
    }))
  );

  const categoryTotals = allExpenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Budget Planner</h1>
          <p className="text-gray-600">Track and manage your travel expenses</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-600 to-teal-500 text-white">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8" />
              <span className="text-3xl font-bold">${totalBudget.toLocaleString()}</span>
            </div>
            <p className="text-blue-100">Total Budget</p>
          </Card>

          <Card className="bg-gradient-to-br from-red-600 to-pink-500 text-white">
            <div className="flex items-center justify-between mb-2">
              <TrendingDown className="w-8 h-8" />
              <span className="text-3xl font-bold">${totalSpent.toLocaleString()}</span>
            </div>
            <p className="text-red-100">Total Spent</p>
          </Card>

          <Card className={`bg-gradient-to-br ${remaining < 0 ? 'from-red-600 to-orange-500' : 'from-green-600 to-emerald-500'} text-white`}>
            <div className="flex items-center justify-between mb-2">
              {remaining < 0 ? <AlertCircle className="w-8 h-8" /> : <TrendingUp className="w-8 h-8" />}
              <span className="text-3xl font-bold">${Math.abs(remaining).toLocaleString()}</span>
            </div>
            <p className={remaining < 0 ? 'text-red-100' : 'text-green-100'}>
              {remaining < 0 ? 'Over Budget' : 'Remaining'}
            </p>
          </Card>
        </div>

        <Card className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Overall Budget Progress</h2>
          <ProgressBar
            value={totalSpent}
            max={totalBudget}
            label="Total Budget Usage"
            color={totalSpent / totalBudget > 0.8 ? 'red' : totalSpent / totalBudget > 0.6 ? 'yellow' : 'green'}
            size="lg"
          />
          <p className="mt-4 text-sm text-gray-600">
            You've spent {((totalSpent / totalBudget) * 100).toFixed(1)}% of your total budget
          </p>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Spending by Category</h2>
            <div className="space-y-4">
              {Object.entries(categoryTotals).map(([category, amount]) => (
                <div key={category}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-700">{category}</span>
                    <span className="font-semibold text-gray-800">${amount.toLocaleString()}</span>
                  </div>
                  <ProgressBar
                    value={amount}
                    max={totalBudget}
                    showPercentage={false}
                    color="blue"
                    size="sm"
                  />
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Budget by Trip</h2>
            <div className="space-y-4">
              {trips.map(trip => (
                <div key={trip.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-800">{trip.title}</h3>
                      <p className="text-sm text-gray-600">{trip.destination}</p>
                    </div>
                    <span className="text-sm font-semibold text-blue-600">
                      ${trip.spent} / ${trip.budget}
                    </span>
                  </div>
                  <ProgressBar
                    value={trip.spent}
                    max={trip.budget}
                    showPercentage
                    color={trip.spent / trip.budget > 0.8 ? 'red' : trip.spent / trip.budget > 0.6 ? 'yellow' : 'green'}
                    size="sm"
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Expenses</h2>
          <div className="space-y-3">
            {allExpenses.length === 0 ? (
              <div className="text-center py-8 text-gray-600">
                No expenses recorded yet
              </div>
            ) : (
              allExpenses
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 10)
                .map(expense => (
                  <div key={expense.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-800">{expense.description}</p>
                      <p className="text-sm text-gray-600">
                        {expense.tripTitle} • {expense.category} • {new Date(expense.date).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="text-lg font-semibold text-blue-600">${expense.amount.toLocaleString()}</span>
                  </div>
                ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};